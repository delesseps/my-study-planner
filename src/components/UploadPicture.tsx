import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Upload, message, Avatar } from "antd";
import { RcFile } from "antd/lib/upload";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import IUser from "constants/interfaces/IUser";
import styled from "styled-components";
import { UploadFile } from "antd/lib/upload/interface";
import { useProfilePicture } from "features/user/user-hooks";

function getBase64(img: any): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(img);
  });
}

function beforeUpload(file: RcFile) {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";

  if (!isJPG && !isPNG) {
    message.error("You can only upload JPG or PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return (isJPG || isPNG) && isLt2M;
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.reducer.user,
});

interface IUploadPictureProps {
  user?: IUser;
}

const UploadPicture: React.FC<IUploadPictureProps> = () => {
  const dispatch = useDispatch();
  const { picture, change } = useProfilePicture();

  const handleUpload = async (file: UploadFile) => {
    const imageUrl = await getBase64(file);

    change(imageUrl as string);
    return imageUrl as string;
  };

  return (
    <StyledUpload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      action={handleUpload}
    >
      <Avatar shape="square" size={120} icon={<UserOutlined />} src={picture} />
    </StyledUpload>
  );
};

const StyledUpload = styled(Upload)`
  cursor: pointer;

  && > div {
    margin: 0;
  }

  &&:hover ~ i {
    opacity: 1;
  }
`;

export default connect(mapStateToProps, null)(UploadPicture);
