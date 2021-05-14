import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Axios from 'axios';
import Dropzone from 'react-dropzone';
import TextArea from 'antd/lib/input/TextArea';

const { Title } = Typography;

const PrivateOption = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
];
const CategoryOption = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
];

function VideoUploadPage() {
    const [videoTite, setVideoTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priv, setPriv] = useState(0);
    const [category, setCategory] = useState(CategoryOption[0].label);

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }
    const onPrivateChagne = (e) => {
        setPriv(e.currentTarget.value);
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }
    const onDrop = ( files ) => {
        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    //console.log(response);
                }else{
                    alert("비디오 업로드를 실패 했습니다. 오류내용 : [" + response + "]");
                }
            })
            .catch(err => {
                alert("오류가 발생했습니다. 오류내용 : [" + err + "]");
            });
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form>
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    {/* Drop zone */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                    >
                        {( {getRootProps, getInputProps }) => (
                            <div style={{
                                    width:'300px', 
                                    height: '240px', 
                                    border:'1px solid lightgray',
                                    padding:'95px 125px',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }} {...getRootProps()}
                            >
                                <input {...getInputProps()}/> 
                                <Icon type="plus" style={{fontSize:'3rem'}} />
                            </div>
                        )}
                    </Dropzone>
                    {/* Tumbnail */}
                    <div>
                        {/* <img src alt/> */}
                    </div>
                </div>
                <br/>
                <br/>
                <labal>Title</labal>
                <Input onChange={onTitleChange} value={videoTite}/>
                <br/>
                <br/>
                <labal>Description</labal>
                <TextArea onChange={onDescriptionChange} value={description}/>
                <br/>
                <br/>
                <select onChange={onPrivateChagne}>
                    {PrivateOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>    
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>    
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large">
                    submit    
                </Button>  
            </Form>
        </div>
    )
}

export default VideoUploadPage
