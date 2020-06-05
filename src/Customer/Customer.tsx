import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelopeSquare,
  faPhoneAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect } from "react";
import { useCurrentUser, useGetCustomers } from "../StaticData/StaticData";
import "./Customer.css";

library.add(faUser, faPhoneAlt, faEnvelopeSquare);

export const Customer: React.FC = () => {
  const users = useGetCustomers();
  const [selectedUser, setSelectedUser] = useCurrentUser();

  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0]);
    }
  }, [users, setSelectedUser]);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedUser = users.find(
        (user) => user.Id === parseInt(event.target.value)
      );
      setSelectedUser(selectedUser);
    },
    [users, setSelectedUser]
  );

  return (
    <div className="customer-wrapper">
      <div className="name">
        <FontAwesomeIcon icon="user" />
        <select value={selectedUser && selectedUser.Id} onChange={onChange}>
          {users.map((user) => (
            <option key={user.Id} value={user.Id}>
              {user.FirstName}
            </option>
          ))}
        </select>
      </div>
      <div className="info">
        <div className="phone">
          <FontAwesomeIcon icon="phone-alt" />
          {selectedUser && <span>{selectedUser.Phone}</span>}
        </div>
        <div>
          <FontAwesomeIcon icon="envelope-square" />
          {selectedUser && <span>{selectedUser.Email}</span>}
        </div>
      </div>
    </div>
  );
};
