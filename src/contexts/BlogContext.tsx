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
import { LoggingContext } from './LoggingContext';
import  Cheerio from 'cheerio';
type BlogContext = {
  blogs: BlogType[];
  blogCount: number;
  loadBlogs: (page, pagecCount, search) => void;
  blogStatus: BlogStatusType[][];
  search: string;
  updateSearch: (string) => void;
  translate: (index, language, languageUrl) => void;
  translateAll: (blogIds) => void;
  resetBlog: (index, languageName, targetId, languageUrl) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BlogContext = createContext<BlogContext>({} as BlogContext);

export const BlogProvider: FC = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [blogCount, setBlogCount] = useState(0);
  const [blogStatus, setBlogStatus] = useState<BlogStatusType[][]>([]);
  const [search, setSearch] = useState('');
  const { username, password } = useContext(UserContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const { languages } = useContext(LanguageContext);
  const { addLog } = useContext(LoggingContext);

  const init = () => {
    setBlogStatus([]);
    setBlogs([]);
    setBlogCount(0);
  };

  const updateSearch = (_search: string) => {
    setSearch(_search);
  };

  const translateBlog = async (blog: BlogType, languageName: string, languageUrl: string) => {
    startLoading(`Translating #${blog.id} into ${languageUrl} in ${languageName}...`);
    const responseTranslate = await translateBlogService(blog, languageName);
    stopLoading();
    if (!responseTranslate) {
      addLog(`Failed to translate #${blog.id} into ${languageUrl}`);
      return;
    }
    if (responseTranslate.title === 'error') {
      addLog(`Failed to translate #${blog.id} into ${languageUrl}`);
      return;
    }
    const $ = Cheerio.load(responseTranslate.content);

    // Remove all anchor elements
    $('a').each((index, element) => {
      const html = $(element).html();
      $(element).replaceWith(html);
    });

    // Get the modified HTML string
    const modifiedHtmlString = $.html();
    // const responseTranslate = {
    //   title: "hello",
    //   content: "world"
    // }
    const language = languages.find((value) => (value.name === languageName && value.url === languageUrl));
    if (!language) return;
    startLoading(`Uploading a media of #${blog.id}...`);
    const uploadMediaResponse = await uploadFeaturedMediaService(
      blog.media,
      responseTranslate.title,
      language
    );
    stopLoading();
    if (!uploadMediaResponse) {
      addLog(`Failed to upload a media of #${blog.id}`);
    }
    startLoading(`Posting a content of #${blog.id}...`);
    const responseSent = await sendBlogService(
      {
        ...blog,
        content: modifiedHtmlString,
        title: responseTranslate.title
      },
      uploadMediaResponse?.mediaId ?? -1,
      language
    );
    stopLoading();
    if (!responseSent) {
      addLog(`Failed to post a content of #${blog.id}`);
      return;
    }
    startLoading(`Updating status of #${blog.id}...`);
    const responseStatusUpdate = await sendBlogStatus(
      blog.id,
      languageName,
      responseSent.id,
      languageUrl
    );
    stopLoading();
    if (!responseStatusUpdate) {
      addLog(`Failed to update status of #${blog.id}`);
      return;
    }
    const index = blogs.findIndex((_blog) => _blog.id === blog.id);
    setBlogStatus(
      blogStatus.map((blogArr, rowIndex) =>
        blogArr.map((blogOneStatus) => {
          if (blogOneStatus.language === languageName && blogOneStatus.url === languageUrl && rowIndex === index) {
            blogOneStatus.sent = true;
            blogOneStatus.targetId = responseSent.id;
          }
          return blogOneStatus;
        })
      )
    );
  };

  const translateAll = async (blogIds: string[]) => {
    startLoading('Loading automation status of selected blogs...');
    const selectedBlogStatus = await getBlogStatusService(blogIds);
    stopLoading();
    for (let i = 0; i < blogIds.length; i++) {
      if (!selectedBlogStatus[i].find((status) => status.sent === false))
        continue;
      startLoading(`Loading a blog #${blogIds[i]}`);
      const blog = await getOneBlogService(username, password, blogIds[i]);
      stopLoading();
      for (let j = 0; j < selectedBlogStatus[i].length; j++) {
        const status: BlogStatusType = selectedBlogStatus[i][j];
        if (!status.sent) {
          await translateBlog(blog, status.language, status.url);
        }
      }
    }
  };

  const translate = async (index: number, languageName: string, languageUrl: string) => {
    await translateBlog(blogs[index], languageName, languageUrl);
  };

  const resetBlog = async (
    index: number,
    languageName: string,
    targetId: string,
    languageUrl: string
  ) => {
    const language = languages.find((value) => (value.name === languageName && value.url === languageUrl));
    if (!language) return;
    const blog = blogs[index];
    const url = language.url + '/wp-json/wp/v2/posts/' + targetId;

    startLoading(`Deleting #${blog.id} in target-${languageName}`);
    const response = await deleteBlogService(
      language.username,
      language.password,
      url
    );
    stopLoading();
    if (!response) {
      addLog(`Failed to delete #${blog.id} in target-${languageName}`);
      return;
    }
    startLoading(`Updating status of #${blog.id}...`);
    const responseStatusUpdate = await deleteBlogStatus(
      blog.id,
      languageName,
      targetId,
      languageUrl
    );
    stopLoading();
    if (responseStatusUpdate) {
      setBlogStatus(
        blogStatus.map((blogArr, rowIndex) =>
          blogArr.map((blogOneStatus) => {
            if (blogOneStatus.language === languageName && rowIndex === index) {
              blogOneStatus.sent = false;
              blogOneStatus.targetId = '-1';
            }
            return blogOneStatus;
          })
        )
      );
    } else {
      addLog(`Failed to update status of #${blog.id}`);
    }
  };

  const loadBlogs = async (
    page: number = 1,
    pageCount: number = 5,
    search: string = ''
  ) => {
    if (isLoading) return;
    startLoading('Loading blogs of current page...');
    const response = await getAllBlogsService(
      username,
      password,
      page,
      pageCount,
      search
    );
    stopLoading();
    if (response) {
      startLoading('Loading automation status of current page...');
      const blogStatusResponse = await getBlogStatusService(
        response.blogs.map((blog) => blog.id)
      );
      stopLoading();
      if (blogStatusResponse) {
        setBlogStatus(blogStatusResponse);
        setBlogs(response.blogs);
        setBlogCount(response.count);
      } else {
        init();
      }
    } else {
      init();
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        blogCount,
        loadBlogs,
        search,
        updateSearch,
        blogStatus,
        translate,
        translateAll,
        resetBlog
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
