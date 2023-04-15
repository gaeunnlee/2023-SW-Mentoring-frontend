import styled from "styled-components";
import Block from "../components/Block";
import Banner from "../components/Banner/Banner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useEffect, useState } from "react";

const Form = styled.form`
  padding: 15px 5px;
`;
const InputContainer = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  color: #333333;
  font-size: 20px;
  font-weight: bold;
  display: block;
`;
const Input = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  box-sizing: border-box;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.0025em;
  color: #333;
  border: 2px solid #bdbdbd;
  &:focus {
    outline: 2px solid #f4c855;
    border: 2px solid #fff;
  }
`;
const ContentsInput = styled.textarea`
  width: 100%;
  height: 150px;
  margin-top: 10px;
  box-sizing: border-box;
  align-items: center;
  padding: 12px;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.0025em;
  color: #333;
  border: 2px solid #bdbdbd;
  &:focus {
    outline: 2px solid #f4c855;
    border: 2px solid #fff;
  }
`;
const FileContainer = styled.div``;
const FileUploadWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 40px 20px;
  gap: 20px;
  background-color: #fff;
  box-sizing: border-box;
  background-image: repeating-linear-gradient(
      0deg,
      #bdbdbd,
      #bdbdbd 10px,
      transparent 10px,
      transparent 21px,
      #bdbdbd 21px
    ),
    repeating-linear-gradient(
      90deg,
      #bdbdbd,
      #bdbdbd 10px,
      transparent 10px,
      transparent 21px,
      #bdbdbd 21px
    ),
    repeating-linear-gradient(
      180deg,
      #bdbdbd,
      #bdbdbd 10px,
      transparent 10px,
      transparent 21px,
      #bdbdbd 21px
    ),
    repeating-linear-gradient(
      270deg,
      #bdbdbd,
      #bdbdbd 10px,
      transparent 10px,
      transparent 21px,
      #bdbdbd 21px
    );
  background-size: 2px 100%, 100% 2px, 2px 100%, 100% 2px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
const FileUploadText = styled.p`
  color: #191d23;
  font-size: 17px;
`;
const FileUploadLabel = styled.label`
  background-color: #f1c368;
  padding: 10px;
  font-size: 30px;
  color: #fff;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  text-align: center;
  box-sizing: border-box;
`;
const FileUploadBtn = styled.input.attrs({ type: "file" })`
  display: none;
`;
const PostBtn = styled.input.attrs({ type: "submit" })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 13px 32px;
  height: 44px;
  background: linear-gradient(139.68deg, #f0c268 5.07%, #fd9569 117.95%);
  border-radius: 4px;
  flex: none;
  order: 3;
  align-self: stretch;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 100%;
  margin-top: 30px;
`;
const ErrorMsg = styled.p`
  font-size: 15px;
  color: #cf3939;
`;
// const schema = yup
//   .object({
//     studentId: yup
//       .string()
//       .required("*학번을 입력해주세요")
//       .test(
//         "len",
//         "*8자리 숫자를 입력해주세요",
//         (val) => val?.toString().length >= 8
//       )
//       .matches(/^[0-9]+(?:\.[a-zA-Z0-9-]+)*$/, "*8자리 숫자를 입력해주세요"),
//     password: yup.string().required("*비밀번호를 입력해주세요"),
//   })
//   .required();
type FormProps = {
  title: string;
  body: string;
  files: [];
  missionId: number;
};
export default function Post() {
  const accessToken = useRecoilValue(LoginStateAtom)
  const [inputState, setInputState] = useState<FormProps>({
    title: '',
    body: '',
    files: [],
    missionId: 0
  });
  const formData = new FormData();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   trigger,
  // } = useForm<FormProps>({
  //   mode: "onChange",
  //   resolver: yupResolver(schema),
  // });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.get('title'))
    console.log(formData.get('body'))
    try {
      const { data } = await axios({
        method: "post",
        url: "http://193.123.241.9:8080/register/13/register",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`
        },
        data: formData,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputState( (prev:any) =>( {
      ...prev,
      [name]: value
    }));
    
  }
  useEffect(()=>{
    formData.append('title', inputState.title)
    formData.append('body', inputState.body)
    
  },[onInputHandler])
  return (
    <>
      <Banner title="글쓰기" prev />
      <Block>
        <Form id="form" onSubmit={(event) => onSubmit(event)}>
          <InputContainer>
            <Label>미션</Label>
            <Input name="mission" onChange={onInputHandler}/>
          </InputContainer>
          <InputContainer>
            <Label>제목</Label>
            <Input name="title" onChange={onInputHandler}/>
          </InputContainer>
          <InputContainer>
            <Label>내용</Label>
            <ContentsInput name="body" onChange={onInputHandler} />
          </InputContainer>
          <FileContainer>
            <Label>사진 업로드</Label>
            <FileUploadWrapper>
              <AiOutlineCloudUpload />
              <FileUploadText>인증 사진을 업로드해주세요!</FileUploadText>
              <FileUploadLabel htmlFor="upload">
                +
                <FileUploadBtn name="files" id="upload" accept="image/*" multiple onChange={onInputHandler}/>
              </FileUploadLabel>
            </FileUploadWrapper>
          </FileContainer>
          <PostBtn value="등록" />
        </Form>
      </Block>
    </>
  );
}
