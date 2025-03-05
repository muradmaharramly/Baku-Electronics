import React from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io';
import { IoTrashBin } from 'react-icons/io5';
import { MdOutlineDone } from 'react-icons/md';
import { Link } from 'react-router-dom'

const administrators = [
  {
    id: 1,
    firstName: "Filankes",
    lastName: "Filankesov",
    role: "Moderator",
    email: "filankes@gmail.com",
    emailConfirmed: true,
    resetCodeConfirmed: true,
    PhoneNumber: "5555555555",
    fin: "7hhw78w",
    created_at: "12.02.2025"
  },
  {
    id: 2,
    firstName: "Behmenkes",
    lastName: "Behmenkesov",
    role: "Admin",
    email: "behmenkes@gmail.com",
    emailConfirmed: false,
    resetCodeConfirmed: true,
    PhoneNumber: "5555555555",
    fin: "7hsgdsj8",
    created_at: "12.02.2025"
  },
];

const Administrators = () => {
  return (
    <div className='administrators'>
      <div className='page-head'>
        <h3>Administrasiya</h3>
        <div className='procces'>
          <div className='search-bar'>
            <input placeholder='Axtar'/>
            <button className="search-icon">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
          <Link>Əlavə et <GoPlus /></Link>
        </div>
      </div>
      <div className="table-container">
                    <table className="administrator-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Ad</th>
                          <th>Soyad</th>
                          <th>Rol</th>
                          <th>Email</th>
                          <th>Şifrə sıfırlama</th>
                          <th>Tel</th>
                          <th>Fin</th>
                          <th>Yaradılma tarixi</th>
                          <th>Əməliyyatlar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {administrators.map((administrator, index) => (
                          <tr key={administrator.id}>
                            <td>{index + 1}</td>
                            <td>{administrator.firstName}</td>
                            <td>{administrator.lastName}</td>
                            <td><span className={`role ${administrator.role === "Moderator" ? "moderator" : "admin"}`}>{administrator.role}</span></td>
                            <td>{administrator.email}<span className={`email-status ${administrator.emailConfirmed === true ? "done" : "not" }`}>{administrator.emailConfirmed === true ? <MdOutlineDone /> : <IoMdClose />}</span></td>
                            <td className={`reset ${administrator.resetCodeConfirmed=== true ? "done" : "not"}`}>{administrator.resetCodeConfirmed === true ? "Təsdiqlənib" : "Təsdiqlənməyib"}</td>
                            <td>{administrator.PhoneNumber}</td>
                            <td>{administrator.fin}</td>
                            <td>{administrator.created_at}</td>
                            <td>
                              <div className="actions">
                                <button className="edit-btn"><FiEdit /></button>
                                <button className="delete-btn"><IoTrashBin /></button>
                              </div>
            
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
    </div>
  )
}

export default Administrators