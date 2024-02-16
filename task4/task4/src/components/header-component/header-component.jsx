import { RegisterComponent } from './register-component/register-component';
import { LoginComponent } from './login-component/login-component';
import { useRef, useState } from 'react';
import { isLoggedIn } from '../../App';
export function HeaderComponent() {
  function logout() {
    localStorage.setItem('currentUser', JSON.stringify('none'));
    window.location.reload();
  }
  const [dialogContent, setDialogContent] = useState(null);
  const dialogRef = useRef(null);
  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }
  return isLoggedIn === `"none"` ? (
    <div
      className={'border-bottom d-flex bg-secondary align-items-center'}
      style={{ minHeight: '60px', maxHeight: '80px' }}>
      <div className={'container'}>
        <div className={'header-component d-flex flex-row align-items-center'}>
          <div
            className={
              'col align-items-center justify-content-center d-flex badge me-1'
            }
            style={{ height: '40px', maxWidth: '80px' }}>
            Task4
          </div>
          <div className={'col d-flex justify-content-end gap-3'}>
            <button
              onClick={() => {
                setDialogContent(<RegisterComponent />);
                toggleDialog();
              }}
              className={'btn btn-primary w-100'}
              style={{ maxHeight: '60px', maxWidth: '80px' }}>
              sign up
            </button>
            <button
              onClick={() => {
                setDialogContent(<LoginComponent />);
                toggleDialog();
              }}
              className={'btn btn-primary w-100'}
              style={{ maxHeight: '60px', maxWidth: '80px' }}>
              sign in
            </button>
          </div>
        </div>
        <dialog ref={dialogRef}>{dialogContent}</dialog>
      </div>
    </div>
  ) : (
    <div
      className={'border-bottom d-flex bg-secondary align-items-center'}
      style={{ minHeight: '60px', maxHeight: '80px' }}>
      <div className={'container'}>
        <div className={'header-component d-flex flex-row align-items-center'}>
          <div
            className={
              'col align-items-center justify-content-center d-flex badge me-1'
            }
            style={{ height: '40px', maxWidth: '80px' }}>
            Task4
          </div>
          <div className={'col d-flex justify-content-end gap-3'}>
            <button
              onClick={() => {
                logout();
              }}
              className={'btn btn-primary w-100'}
              style={{ maxHeight: '60px', maxWidth: '80px' }}>
              logout
            </button>
          </div>
        </div>
        <dialog ref={dialogRef}>{dialogContent}</dialog>
      </div>
    </div>
  );
}
