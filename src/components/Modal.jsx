import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { ImGithub } from 'react-icons/im';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { RiUserFollowLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiUserFollowFill } from 'react-icons/ri';

import { FormatDate } from '../utils/formatDate';
import './Modal.css';

const Modal = ({ user, closeModal }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <button className="close-button" onClick={closeModal}>
          <AiFillCloseCircle />
        </button>

        {user && (
          <div className="user">
            <img src={user.avatar_url} alt={user.login} width={150} />
            <h1>
              <AiOutlineUser />
              {user.name}
            </h1>
            <p>
              <ImGithub />
              {user.login}
            </p>
            <p>
              <RiGitRepositoryLine />
              {user.public_repos}
              Public Repos
            </p>
            <p>
              <RiUserFollowLine />
              Followers:
              {user.followers}
            </p>
            <p>
              <RiUserFollowFill />
              {user.following}
            </p>
            <p>
              <BiTimeFive />
              {FormatDate(user.created_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
