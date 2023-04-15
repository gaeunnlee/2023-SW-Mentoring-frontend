import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Banner from "../components/Banner/Banner";
import Block from "../components/Block";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoginStateAtom } from "../state/LoginState";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../props/LoginProps";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  gap: 15px;
  margin-top: 30px;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  input[type="text"],
  input[type="password"] {
    height: 40px;
    padding: 3px 10px;
    font-size: 20px;
  }
  input[type="text"]:focus,
  input[type="password"]:focus {
    outline: 0;
  }
`;
const Label = styled.label`
  font-family: "TheJamsil";
  font-size: 20px;
`;
const StudentId = styled.input.attrs({ type: "text" })`
  font-family: "TheJamsil";
`;
const Password = styled.input.attrs({ type: "password" })`
  font-family: "TheJamsil";
`;
const LoginBtn = styled.input.attrs({ type: "submit" })`
  height: 45px;
  font-size: 20px;
  border-radius: 10px;
  background: linear-gradient(139.68deg, #f0c268 5.07%, #fd9569 117.95%);
  border-radius: 10px;
  color: #fff;
`;
const ErrorMsg = styled.p`
  font-size: 15px;
  color: #cf3939;
`;
const schema = yup
  .object({
    studentId: yup
      .string()
      .required("*학번을 입력해주세요")
      .test(
        "len",
        "*8자리 숫자를 입력해주세요",
        (val) => val?.toString().length >= 8
      )
      .matches(/^[0-9]+(?:\.[a-zA-Z0-9-]+)*$/, "*8자리 숫자를 입력해주세요"),
    password: yup.string().required("*비밀번호를 입력해주세요"),
  })
  .required();
type FormProps = {
  studentId: string;
  password: string;
};
export default function Login() {
  const [ studentId, setStudentId ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginState, setLoginState ] = useRecoilState(LoginStateAtom)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormProps>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormProps> = async (loginData) => {
    alert(JSON.stringify(loginData));
    try {
      const { data } = await axios({
        method: "post",
        url: "http://193.123.241.9:8080/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      });
      setLoginState(data)
      setLoginState( (prev: LoginProps) => { return ({
        ...prev,
        state: true
      })})
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    console.log(loginState)
  },[])
  useEffect(()=>{
    console.log(loginState)
  },[loginState])
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    if (inputName === ("studentId" || "password")) {
      trigger(inputName);
      if ("studentId") {
        setStudentId(inputName);
      } else if ("password") {
        setPassword(inputName);
      }
    }
  };

  const setLogin = async (loginData: FormProps) => {
    // try {
    //   await axios({
    //     method: "post",
    //     url: "http://193.123.241.9:8080/user/login",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     data: {
    //       studentId: "32212970",
    //       password: "12345678"
    //     },
    //   });
    // }
    // catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <>
      <Banner title="로그인" prev />
      <Block>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label>학번</Label>
              <StudentId
                placeholder="32XXXXXX"
                {...register("studentId")}
                name="studentId"
                type="text"
                onInput={onInputHandler}
                autoComplete="off"
                maxLength={8}
              />
              <ErrorMsg>
                {errors.studentId ? errors.studentId.message : ""}
              </ErrorMsg>
            </InputContainer>
            <InputContainer>
              <Label>비밀번호</Label>
              <Password
                {...register("password")}
                name="password"
                type="password"
                onInput={onInputHandler}
                placeholder="********"
              />
              <ErrorMsg>
                {errors.password ? errors.password.message : ""}
              </ErrorMsg>
            </InputContainer>
            <LoginBtn value="로그인" />
          </Form>
        </Container>
      </Block>
    </>
  );
}
