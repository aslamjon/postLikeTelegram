import axios from "axios";
import { get, head, isEmpty, isNull } from "lodash";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import patternImg from "./pattern.svg";
import sendIcon from "./send.svg";

const Style = styled.div`
  a {
    text-decoration: none;
    color: #000;
  }
  .container {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100vw;
    min-height: 100vh;
  }
  .youtube-content-wrapper {
    width: 420px;
    min-height: 395px;
    background-color: #8774e1;
    padding: 8px 10px;
    border-radius: 8px;
    color: #fff;
    
    &-url {
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        text-decoration: underline;
    }
    &-main {
      border-left: 2px solid #fff;
      margin-top: 6px;
      &-container {
        padding-left: 8px;
      }
      &-img {
        border-radius: 4px;
        width: 100%;
        height: 236px;
        margin: 3px 0;
      }
      &-youtbe {
        color: #fff;
      }
      &-title {
        margin-top: 1px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
      }
      &-description {
        word-break: break-word;
        margin-top: 3px;
        font-size: 14px;
        line-height: 18px;
        height: 54px;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
      }
    }
    .time {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      height: 24px;
      color: #fff;
    }
  }
  .bg {
    
  }
  form {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #212121;
    padding: 5px;
    height: 54px;
    width: 640px;
    border-radius: 0.75rem;
    label {
      height: 80%;
    width: 100%;
    padding: 0 14px;
    input {
      border: none;
      outline: none;
      border-radius: 4px;
      height: 100%;
      width: 100%;
      margin-right: 10px;
      box-sizing: border-box;
      color: #fff;
      background: none;
      caret-color: #8774e1;
    }
  }

    button {
      min-height: 46px;
      min-width: 46px;
      border: none;
      background-color: #8774e1;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
      margin-right: 10px;
      &:after {
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 54%;
        transform: translate(-50%, -50%);
        -webkit-mask-size: cover;
      mask-size: cover;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-image: url(${sendIcon});
      -webkit-mask-image: url(${sendIcon});
      background: #fff;
      }
    }
  }
`;

const Img = styled.div`
  ${({ src }) => src && css`
    background: url(${src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const Bakcground = styled.div`
    width: 100vw;
    height: 100vh;
/* -webkit-mask-size: cover;
  mask-size: cover; */
  /* mask-repeat: no-repeat; */
  mask-position: center;
  /* -webkit-mask-repeat: no-repeat; */
  -webkit-mask-position: center;

  mask-image: url(${patternImg});
  -webkit-mask-image: url(${patternImg});
background: linear-gradient(300deg,#fec496,#dd6cb9,#962fbf,#4f5bd5);
`;

function App() {

  const [state, setState] = useState({
    id: "-lR6ZFbXxRM",
    browserUrl: "https://www.youtube.com/watch?v=-lR6ZFbXxRM",
    title: "",
    description: "",
    thumbnails: {},
    value: ""
  });

  let id = "-lR6ZFbXxRM";
  let key = "AIzaSyDh5AplsMZWTC--1HSWgoDWTMbuLWUn64o";

  const getUrl = (id) => `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${key}`;

  useEffect(() => {
    getData(id)
  }, []);

  const getData = (id) => {
    axios.get(getUrl(id))
      .then(function (response) {
        if (!isEmpty(get(response, "data.items", false)))
          if (!isNull(get(head(get(response, "data.items", [])), "snippet", null)))
            setState(s => ({ ...s, ...get(head(get(response, "data.items", [])), "snippet", null) }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onChange = (e) => {
    setState(s => ({ ...s, value: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let value = state.value.replace("https://www.youtube.com/watch?v=", "");
    if (value.length > 11 ) value = value.replace("https://youtu.be/","");
    if (value.length >= 7) getData(value);
  }

  return (
    <Style className="App">
      <Bakcground className="bg">
      </Bakcground>
      <div className="container">

        <div className="youtube-content-wrapper">
          <a className="youtube-content-wrapper-url" href={state.browserUrl} target="_blank" > {state.browserUrl} </a>
          <div className="youtube-content-wrapper-main">
            <div className="youtube-content-wrapper-main-container">
              <Img src={get(state, "thumbnails.medium.url", "")} className="youtube-content-wrapper-main-img" />
              <a href={get(state, "browserUrl")} target="_blank" >
                <div className="youtube-content-wrapper-main-youtbe">Youtube</div>
                <div className="youtube-content-wrapper-main-title">{get(state, "title", "")}</div>
                <div className="youtube-content-wrapper-main-description">{get(state, "description", "")}</div>
              </a>
            </div>
          </div>
          <div className="time">2:22 PM</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" value={state.value} onChange={onChange} placeholder="Enter Youtube Url" />
          </label>
          <button ></button>
        </form>

      </div>
    </Style>
  );
}

export default App;
