import { FC, useState, createContext, useContext } from 'react';
import { loginService } from 'src/services/Auth/Auth';
import { LoadingContext } from './LoadingContext';
import { BlogStatusType, BlogType } from 'src/models/blog';
import { UserContext } from './UserContext';
import {
  deleteBlogService,
  deleteBlogStatus,
  getAllBlogsService,
  getBlogStatusService,
  getOneBlogService,
  sendBlogService,
  sendBlogStatus,
  translateBlogService,
  uploadFeaturedMediaService
} from 'src/services/Blog';
import { LanguageContext } from './LanguageContext';
type BlogContext = {
  blogs: BlogType[],
  blogCount: number,
  loadBlogs: (page, pagecCount, search) => void,
  blogStatus: BlogStatusType[][]
  search: string,
  updateSearch: (string) => void,
  translate: (index, language) => void,
  translateAll: (blogIds) => void,
  resetBlog: (index, languageName, targetId) => void
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BlogContext = createContext<BlogContext>(
  {} as BlogContext
);

export const BlogProvider: FC = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [blogCount, setBlogCount] = useState(0);
  const [blogStatus, setBlogStatus] = useState<BlogStatusType[][]>([])
  const [search, setSearch] = useState("")
  const { username, password } = useContext(UserContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { languages } = useContext(LanguageContext);

  const init = () => {
    setBlogStatus([])
    setBlogs([]);
    setBlogCount(0)
  }

  const updateSearch = (_search: string) => {
    setSearch(_search);
  }

  const translateBlog = async (blog: BlogType, languageName: string) => {
    startLoading(`Translating #${blog.id} into ${languageName}...`)
    const responseTranslate = await translateBlogService(blog, languageName);
    stopLoading()
    if (!responseTranslate) return;
    if (responseTranslate.title === "error") return;
    // const responseTranslate = {
    //   title: "hello",
    //   content: "world"
    // }
    const language = languages.find(value => (value.name === languageName));
    if (!language) return;
    startLoading("Uploading a media...")
    const uploadMediaResponse = await uploadFeaturedMediaService(blog.media, responseTranslate.title, language);
    console.log(uploadMediaResponse);
    stopLoading();
    if (!uploadMediaResponse) return;
    startLoading("Posting a blog...")
    const responseSent = await sendBlogService({
      ...blog,
      content: responseTranslate.content,
      title: responseTranslate.title
    }, uploadMediaResponse.mediaId, language);
    stopLoading();
    if (!responseSent) return;
    startLoading("Updating Status...")
    const responseStatusUpdate = await sendBlogStatus(blog.id, languageName, responseSent.id);
    console.log(responseStatusUpdate)
    stopLoading();
    if (!responseStatusUpdate) return;
    const index = blogs.findIndex(_blog => (_blog.id === blog.id));
    setBlogStatus(blogStatus.map((blogArr, rowIndex) => (blogArr.map(blogOneStatus => {
      if (blogOneStatus.language === languageName && rowIndex === index) {
        blogOneStatus.sent = true;
        blogOneStatus.targetId = responseSent.id;
      }
      return blogOneStatus;
    }))))
  }

  const translateAll = async (blogIds: string[]) => {
    startLoading("Loading automation status...");
    const selectedBlogStatus = await getBlogStatusService(blogIds);
    stopLoading();
    for (let i = 0; i < blogIds.length; i++) {
      if (!selectedBlogStatus[i].find(status => (status.sent === false))) continue;
      startLoading(`Loading blog #${blogIds[i]}`);
      const blog = await getOneBlogService(username, password, blogIds[i]);
      stopLoading();
      for (let j = 0; j < selectedBlogStatus[i].length; j++) {
        const status: BlogStatusType = selectedBlogStatus[i][j];
        if (!status.sent) {
          await translateBlog(blog, status.language);
        }
      }
    }
  }

  const translate = async (index: number, languageName: string) => {
    await translateBlog(blogs[index], languageName);
  }

  const resetBlog = async (index: number, languageName: string, targetId: string) => {
    const language = languages.find(value => (value.name === languageName));
    if (!language) return;
    const blog = blogs[index];
    const url = language.url + "/wp-json/wp/v2/posts/" + targetId;

    startLoading(`Deleting #${blog.id} in target-${languageName}`);
    const response = await deleteBlogService(language.username, language.password, url);
    stopLoading();
    startLoading("Updating Status...")
    const responseStatusUpdate = await deleteBlogStatus(blog.id, languageName, targetId);
    stopLoading();
    if (responseStatusUpdate) {
      setBlogStatus(blogStatus.map((blogArr, rowIndex) => (blogArr.map(blogOneStatus => {
        if (blogOneStatus.language === languageName && rowIndex === index) {
          blogOneStatus.sent = false;
          blogOneStatus.targetId = "-1";
        }
        return blogOneStatus;
      }))))
    }
  }

  const loadBlogs = async (page: number = 1, pageCount: number = 5, search: string = "") => {
    if (isLoading) return;
    startLoading("Loading Blogs...")
    const response = await getAllBlogsService(username, password, page, pageCount, search);
    stopLoading();
    if (response) {
      console.log(response);
      startLoading("Loading Automation Status...")
      const blogStatusResponse = await getBlogStatusService(response.blogs.map(blog => (blog.id)));
      stopLoading();
      if (blogStatusResponse) {
        setBlogStatus(blogStatusResponse);
        setBlogs(response.blogs);
        setBlogCount(response.count);
      } else {
        init();
      }
    } else {
      init()
    }
  }

  return (
    <BlogContext.Provider
      value={{ blogs, blogCount, loadBlogs, search, updateSearch, blogStatus, translate, translateAll, resetBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};