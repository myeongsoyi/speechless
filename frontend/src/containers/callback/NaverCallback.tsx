import { useEffect } from 'react';
import { useLocalAxios } from "../../utils/axios.ts";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.ts";

export const NaverCallback = () => {
	const navigate = useNavigate();
	const authStore = useAuthStore();
	const localAxios = useLocalAxios(false);

	useEffect(() => {
		const code = new URL(document.location.toString()).searchParams.get('code');

		if (authStore.accessToken) {
			navigate('/');
			return;
		}

		localAxios.post('/naver/login', null, {
			params: { code }
		})
			.then(response => {
				authStore.setAuth(response.data);
				navigate('/');
			})
			.catch(() => {
				//navigate('/error');
			});
	}, []);

	return <></>;
};
