import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  EditOutlined as Edit,
  StopOutlined as Stop,
  DeleteOutlined as Delete,
  CheckOutlined as Check,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>

      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          viewModal={viewModal}
          setViewModal={setViewModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}
      <Modal
        title={modalTitle}
        isVisible={viewModal}
        setIsVisible={() => setViewModal(!viewModal)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    viewModal,
    setViewModal,
    setModalTitle,
    setModalContent,
  } = props;

  const editUser = (user) => {
    setViewModal(!viewModal);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(<EditUserForm user={user} />);
  };
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => editUser(user)}>
              <Edit />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Desactivar Usuario")}
            >
              <Stop />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Eliminar Usuario")}
            >
              <Delete />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
                   ${user.lastname ? user.lastname : "..."}
                  `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}

function UsersInactive(props) {
  const { usersInactive } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => console.log("Activar Usuario")}
            >
              <Check />
            </Button>,
            <Button
              type="danger"
              onClick={() => console.log("Eliminar Usuario")}
            >
              <Delete />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`${user.name ? user.name : "..."}
                       ${user.lastname ? user.lastname : "..."}
                      `}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
}
