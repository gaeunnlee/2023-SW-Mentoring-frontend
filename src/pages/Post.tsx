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
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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
const DifficultyContainer = styled.div`
  margin: 20px 0 10px;
  display: flex;
  gap: 10px;
`;
const DifficultyLabel = styled.label`
  cursor: pointer;
  border: solid 2px #b2dd94;
  background-color: #fff;
  padding: 8px;
  border-radius: 5px;
  &.difficultySelected {
    background-color: #b2dd94;
  }
`;
const DifficultyInput = styled.input.attrs({ type: "radio" })`
  display: none;
`;
const MissionsContainer = styled.div`
  max-height: 100px;
  overflow-y: auto;
`;
const MissionLabel = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
  &.missionSelected span {
    padding: 3px 5px;
    border-radius: 3px;
    background-color: #b2dd94;
  }
  span:hover {
    padding: 3px 5px;
    border-radius: 3px;
    background-color: #e8ffd8;
  }
`;
const MissionInput = styled.input.attrs({ type: "radio" })`
  display: none;
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
  cursor: pointer;
`;
const FileUploadBtn = styled.input.attrs({ type: "file" })`
  display: none;
`;
const UploadedFileContainer = styled.div`
  font-size: 12px;
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 50px;
  }

  &::-webkit-scrollbar-thumb {
    border-top: solid 20px transparent;
    border-bottom: solid 20px transparent;
    border-radius: 10px;
    box-shadow: inset 0 0 20px 20px #ffdc89;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 20px 20px #dedede;
    border-top: solid 20px transparent;
    border-bottom: solid 20px transparent;
  }
`;

const UploadedFileItem = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
const PostBtn = styled.input.attrs({ type: "submit" })`
  cursor: pointer;
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

type FormProps = {
  title: string;
  body: string;
  files: [];
  missionId: number;
};

interface DifficultiesProps {
  id: string;
  name: string;
}

interface MissionsProps {
  bonusList: [];
  category: string;
  description: string;
  id: number;
  info: string;
  name: string;
  point: number;
}
interface selectedMissionProps {
  id: number;
  name: string;
}

export default function Post() {
  const token = useRecoilValue(LoginStateAtom);
  const [inputState, setInputState] = useState<FormProps>({
    title: "",
    body: "",
    files: [],
    missionId: 0,
  });
  const [difficulties, getDifficulties] = useState<DifficultiesProps[]>();
  const [missions, setMissions] = useState<MissionsProps[]>();
  const [loading, setLoading] = useState(false);
  const [selectedMission, setSelectedMission] = useState<selectedMissionProps>({
    id: 0,
    name: "",
  });
  const [inputDefault, setInputDefault] = useState(false);
  const [filesArray, setFilesArray] = useState([""]);
  const [form, setForm] = useState<FormData>();
  const navigate = useNavigate();
  const getMission = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const selected = event.currentTarget.value;
    axios({
      method: "get",
      url: `/missions/difficulty/${selected}?page=1&size=100`,
    }).then(function (response) {
      setMissions(response.data.content);
    });
  };
  const formData = new FormData();
  useEffect(() => {
    if (!(token.accessToken.length > 0)) {
      navigate("/login");
    }
    axios({
      method: "get",
      url: "/missions/difficulty",
    }).then(function (response) {
      getDifficulties(response.data);
    });
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (inputState.title.length === 0) {
      alert("제목을 입력해주세요");
    } else if (inputState.body.length === 0) {
      alert("내용을 입력해주세요");
    } else if (selectedMission.id === 0) {
      alert("미션을 선택해주세요");
    }
    try {
      await axios({
        method: "post",
        url: `/register/${selectedMission.id}/register`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.accessToken}`,
        },
        data: form,
      }).then((response) => {
        setLoading(false);
        alert("글이 등록되었습니다");
        navigate("/");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onInputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputState((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilesArray([]);
    const files = Array.from(e.target.files || []);
    console.log(files);
    files.forEach((f, index) => {
      setFilesArray((url) => [...url, URL.createObjectURL(f)]);
      formData.append("files", f);
    });
    formData.append("title", inputState.title);
    formData.append("body", inputState.body);
    setForm(formData);
  };

  const handleSelected = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const inputName = e.currentTarget.name;
    const originSelected = document.querySelectorAll(`.${inputName}Selected`);
    if (originSelected.length >= 1) {
      originSelected[0].classList.remove(`${inputName}Selected`);
    }
    e.currentTarget.parentElement?.classList.add(`${inputName}Selected`);
    setInputDefault(false);
    if (inputName === "difficulty") {
      if (document.querySelectorAll(".missionSelected").length > 0) {
        document
          .querySelectorAll(".missionSelected")[0]
          .classList.remove("missionSelected");
      }
    }
  };

  return (
    <>
      <Banner title="글쓰기" prev />
      <Block>
        {loading && <Loading />}
        <Form id="form" onSubmit={(event) => onSubmit(event)}>
          <InputContainer>
            <Label>미션</Label>
            <Input
              name="missionId"
              onChange={onInputHandler}
              placeholder="아래 난이도를 눌러 선택해주세요"
              value={selectedMission.name}
              disabled
            />
            <DifficultyContainer>
              {difficulties?.map((item) => {
                return (
                  <DifficultyLabel>
                    <DifficultyInput
                      name="difficulty"
                      value={item.id}
                      onClick={(e) => {
                        getMission(e);
                        handleSelected(e);
                      }}
                    />
                    {item.name}
                  </DifficultyLabel>
                );
              })}
            </DifficultyContainer>
            <MissionsContainer>
              {missions?.map((item) => {
                return (
                  <MissionLabel>
                    <MissionInput
                      name="mission"
                      className="mission"
                      value={`${item.id}&${item.name}`}
                      checked={inputDefault}
                      onClick={(e) => {
                        handleSelected(e);
                        setSelectedMission({
                          id: Number(e.currentTarget.value.split("&")[0]),
                          name: e.currentTarget.value.split("&")[1],
                        });
                      }}
                    />
                    <span>{item.name}</span>
                  </MissionLabel>
                );
              })}
            </MissionsContainer>
          </InputContainer>
          <InputContainer>
            <Label>제목</Label>
            <Input name="title" onChange={onInputHandler} />
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
              <UploadedFileContainer>
                {filesArray[0]===""||filesArray.map((item) => {
                  return <UploadedFileItem src={item} />;
                })}
              </UploadedFileContainer>
              <FileUploadLabel htmlFor="upload">
                +
                <FileUploadBtn
                  name="files"
                  id="upload"
                  accept="image/*"
                  multiple
                  onChange={handleFile}
                />
              </FileUploadLabel>
            </FileUploadWrapper>
          </FileContainer>
          <PostBtn value="등록" />
        </Form>
      </Block>
    </>
  );
}
