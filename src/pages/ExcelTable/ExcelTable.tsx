/**********************************************************************************************************************
 ***********  This component is the table handles table management from excel
 *********************************************************************************************************************/

import React from 'react';
import {
  Box,
  Zoom
} from '@mui/material';

import Datatable from '../../components/Datatable';
import { useDropzone } from 'react-dropzone';
import * as XLSX from "xlsx";
// import { uploadExcelService } from '../../services/Excel/Excel';
import Spinner from '../../components/Spinner/Spinner';
import { createPartService } from '../../services/Excel/Excel';

type ObjectType = {
  [key: string]: string
}

const ExcelTable = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setLoading] = React.useState(false);

  // read data from excel
  function readExcelFile(_file: File) {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>) {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: (string[])[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(jsonData.length)

        const startUploadData = async () => {
          setLoading(true);
          const columns = jsonData[0];
          const length = jsonData.length - 1;
          const onBlock = 500;
          for (let i = 0; i < Math.ceil(length / onBlock); i++) {
            const partDataArr: ObjectType[] = [];
            for (let j = i * onBlock; j < Math.min(length, (i + 1) * onBlock); j++) {
              const partData: ObjectType = {};
              for (let k = 0; k < columns.length; k++)
                partData[columns[k]] = jsonData[j + 1][k];
              partData["No"] = (j + 1).toString();
              partDataArr.push(partData);
            }
            let response: (string | null) = null ;
            while ( !response ) {
              response = await createPartService(partDataArr, i === 0);
            }
          }
          setLoading(false)
        }

        startUploadData();

      } catch (error) {
        console.log(error)
      }
    };

    reader.onerror = function (error) {
      console.log(error)
    };

    reader.readAsArrayBuffer(_file);
  }


  // handle loaded event of file
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if ( isLoading ) return ;
    const _file = acceptedFiles[0];
    setFile(_file)

    // const uploadFile = async () => {
    //   setLoading(true);
    //   const formData = new FormData();
    //   formData.append("file", _file);
    //   await uploadExcelService(formData);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }
    //     , 3000);
    // }

    // uploadFile();

    readExcelFile(_file);
  }, [])
  // use dropzone for uploading file
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <Box
      sx={{
        padding: { sm: "50px 20px", xs: "20px 10px" }
      }}>
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <Box sx={{
          m: { sm: 1 }, my: { xs: 1 }
        }}>
          <Box sx={{
            border: "2px dotted lightgray",
            borderRadius: "5px",
            width: "100%",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            '&:hover': {
              backgroundColor: "rgb(25,118,220)",
              color: "white"
            }
          }}
            {...getRootProps()}
          >
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              file ? file.name : "Drag and drop files here, or click to select files"
            )}
            <input 
              {...getInputProps()}
            />
          </Box>
        </Box>
      </Zoom>
      {
        isLoading ? <Spinner /> :
          <Zoom in={true} style={{ transitionDelay: "400ms" }}>
            <Box>
              <Datatable />
            </Box>
          </Zoom>
      }
    </Box>
  )
}

export default ExcelTable;