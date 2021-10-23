// import Modal from "../../components/molecules/Modal";


const showLoginModal = () => {
    document.getElementById('modal-login').classList.toggle('active');
    document.getElementById('modalLoginEffect').classList.toggle('active');
}


const closeLoginModal = () => {
    document.getElementById('modal-login').classList.toggle('active')
    document.getElementById('modalLoginEffect').classList.toggle('active')
}

const showRegisterModal = () => {
    document.getElementById('modal-register').classList.toggle('active');
    document.getElementById('modalRegisterEffect').classList.toggle('active');
}

const closeRegisterModal = () => {
    document.getElementById('modal-register').classList.toggle('active')
    document.getElementById('modalRegisterEffect').classList.toggle('active')
}

export { showLoginModal, closeLoginModal, showRegisterModal, closeRegisterModal }