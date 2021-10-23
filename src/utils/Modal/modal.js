// import Modal from "../../components/molecules/Modal";


const showLoginModal = () => {
    setTimeout(() => {
        document.getElementById('modal-login').classList.toggle('active');
        document.getElementById('modalLoginEffect').classList.toggle('active');
    }, 0);
}


const closeLoginModal = () => {
    setTimeout(() => {
        document.getElementById('modal-login').classList.toggle('active')
        document.getElementById('modalLoginEffect').classList.toggle('active')
    }, 0);
}

const showRegisterModal = () => {
    setTimeout(() => {
        document.getElementById('modal-register').classList.toggle('active');
        document.getElementById('modalRegisterEffect').classList.toggle('active');
    }, 0);
}

const closeRegisterModal = () => {
    setTimeout(() => {
        document.getElementById('modal-register').classList.toggle('active')
        document.getElementById('modalRegisterEffect').classList.toggle('active')
    }, 0);
}

export { showLoginModal, closeLoginModal, showRegisterModal, closeRegisterModal }