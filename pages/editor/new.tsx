import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import { Input, Button, message } from 'antd';
import request from 'service/fetch';
import styles from './index.module.scss';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const NewEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    if(!title){
        message.warning('Please enter the title')
        return
    }else{
        request.post('/api/article/publish',{
            title,
            content
        }).then((res: any) => {
            if (res?.code === 0){
                message.success('Successfully post')
            }else{
                message.error(res?.msg || 'Failed')
            }
        })
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event?.target?.value);
  };

  const handleContentChange = (content: any) => {
    setContent(content)
  }

  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          className={styles.title}
          placeholder="Please enter the title"
          value={title}
          onChange={handleTitleChange}
        />
        <Button
          className={styles.button}
          type="primary"
          onClick={handlePublish}
        >
          Post
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </div>
  );
};

(NewEditor as any).layout = null;

export default NewEditor;
