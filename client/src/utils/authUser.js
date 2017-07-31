let sessionStorage = sessionStorage || window.sessionStorage

export function savaSession(name, value) {
	sessionStorage.setItem(name.value)
}

export function getSession(name) {
	return sessionStorage.getItem(name);
}

export function removeCookie(name) {
	sessionStorage.removeItem(name)
}

export function signOut() {
	sessionStorage.removeItem('token')
}

export function isLogin() {
	return !!sessionStorage.getItem('token')
}