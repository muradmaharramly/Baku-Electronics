import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io';
import { IoTrashBin } from 'react-icons/io5';
import { MdOutlineDone, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../../tools/request/fetchUsers';
import PreLoader from '../../PreLoader';
import { PiEmpty } from 'react-icons/pi';
import { SlRefresh } from 'react-icons/sl';
import Swal from 'sweetalert2';
import { supabase } from '../../../services/supabaseClient';

const AdminUsers = () => {
  const { user, userCount, loading, error } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      fetchUsers();
    }, []);

  if (loading) return <PreLoader />;

  if (error) return <p>Xəta baş verdi: {error}</p>;

  if (!user) return <p>Istifadəçi tapılmadı!</p>;


  const sortedUsers = [...user].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.ceil(userCount / userPerPage);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const filteredUsers = user.filter((user) =>
    [user.firstName, user.lastName, user.email, user.fin, user.phoneNumber].some((field) =>
      String(field || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const resetFilter = () => {
    setSearchTerm('');
  };

    const handleDeleteUser = async (id) => {
  
      Swal.fire({
          title: "Əminsiniz?",
          text: "Bu istifadəçini sildikdən sonra geri qaytara bilməyəcəksiniz!",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Bəli, sil!",
          cancelButtonText: "Ləğv et",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              content: "custom-swal-text",
              confirmButton: "custom-swal-confirm",
              cancelButton: "custom-swal-cancel",
              icon: "custom-swal-icon"
          }
      }).then(async (result) => {
          if (result.isConfirmed) {
              const { data, error } = await supabase
                  .from("users")
                  .delete()
                  .eq("id", id)
                  .single();
  
              if (error) {
                  Swal.fire({
                      title: "Xəta!",
                      text: "Silinmə zamanı xəta baş verdi!",
                      icon: "error",
                      customClass: {
                          popup: "custom-swal-popup",
                          title: "custom-swal-title",
                          content: "custom-swal-text",
                          confirmButton: "custom-swal-confirm"
                      }
                  });
                  return;
              }
  
              Swal.fire({
                  title: "Uğur!",
                  text: "Istifadəçi uğurla silindi!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                      popup: "custom-swal-popup",
                      title: "custom-swal-title",
                      content: "custom-swal-text"
                  }
              }).then(() => {
                  window.location.reload();
              });
          }
      });
  };
  return (
    <div className='admin-users'>
      <div className='page-head'>
        <h3>İstifadəçilər <span className='count'>({userCount} nəfər)</span></h3>
        <div className='procces'>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Axtar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
          <Link>Əlavə et <GoPlus /></Link>
        </div>
      </div>
      {filteredUsers.length === 0 ? (
        <div className='empty-area'>
          <div className='icon'><PiEmpty /></div>
          <p>Uyğun istifadəçi tapılmadı.</p>
          <button className='reset-btn' onClick={resetFilter}><SlRefresh /> Axtarışı sıfırla</button>
        </div>
      ) : (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Email</th>
                <th>Şifrə sıfırlama</th>
                <th>Tel</th>
                <th>Fin</th>
                <th>Yaradılma tarixi</th>
                <th>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td className='firstName'>{user.firstName}</td>
                    <td className='lastName'>{user.lastName}</td>
                    <td>{user.email}<span className={`email-status ${user.emailConfirmed === true ? "done" : "not"}`}>{user.emailConfirmed === true ? <MdOutlineDone /> : <IoMdClose />}</span></td>
                    <td>{user.resetCode === null ? "Yoxdur" : user.resetCode.slice(0, 2)}{user.resetCode === null ? " " : "****"}<span className={`reset ${user.resetCodeConfirmed === true ? "done" : "not"}`}>{user.resetCodeConfirmed === true ? <MdOutlineDone /> : <IoMdClose />}</span></td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.fin}</td>
                    <td>{user.created_at.slice(0, 10)}<span className='create-hour'>{user.created_at.slice(11, 17)}</span></td>
                    <td>
                      <div className="actions">
                        <button className="edit-btn"><FiEdit /></button>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{(currentPage-1)*8 + index + 1}</td>
                    <td className='firstName'>{user.firstName}</td>
                    <td className='lastName'>{user.lastName}</td>
                    <td>{user.email}<span className={`email-status ${user.emailConfirmed === true ? "done" : "not"}`}>{user.emailConfirmed === true ? <MdOutlineDone /> : <IoMdClose />}</span></td>
                    <td>{user.resetCode === null ? "Yoxdur" : user.resetCode.slice(0, 2)}{user.resetCode === null ? " " : "****"}<span className={`reset ${user.resetCodeConfirmed === true ? "done" : "not"}`}>{user.resetCodeConfirmed === true ? <MdOutlineDone /> : <IoMdClose />}</span></td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.fin}</td>
                    <td>{user.created_at.slice(0, 10)}<span className='create-hour'>{user.created_at.slice(11, 17)}</span></td>
                    <td>
                      <div className="actions">
                        <button className="edit-btn"><FiEdit /></button>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}><IoTrashBin /></button>
                      </div>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {totalPages > 1 && filteredUsers.length !== 0 && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <MdOutlineKeyboardArrowLeft />
          </button>
          <div className='numbers'>
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminUsers