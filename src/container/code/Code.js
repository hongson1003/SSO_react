import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/actions/accountAction";

const Code = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isFirstOne = useRef(false);
    const dispatch = useDispatch();
    const message = useSelector(state => state.account.errMessage)
    const user = useSelector(state => state.account.userInfo);
    useEffect(() => {

        const verify = () => {
            if (isFirstOne.current === false) {
                isFirstOne.current = true;
                const sso = searchParams.get('sso');
                if (sso) {
                    dispatch(doLogin(sso));
                }
                // No need for isFirstOne = true; since isFirstOne is now a ref
            }
        }
        const toHome = () => {
            if (user) {
                navigate('/');
            }
        }
        verify();
        toHome();
    }, [searchParams, navigate, dispatch, user]);


    return (
        <div>
            {message.trim() === "" ?
                <h1 className="text-center p-5">Đăng nhập thành công</h1> :
                <h1 className="text-center p-5">{message} <a href="/">Vui lòng nhấp vào đây để trở lại trang home ...'</a></h1>

            }
        </div>
    )
}

export default Code;