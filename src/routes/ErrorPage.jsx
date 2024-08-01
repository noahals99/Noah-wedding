import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    return(
        <div id="error-page-conatiner">
            <p id="error-404">404</p>
            <p className="error-text">Whoops!</p>
            <p className="error-text">Sorry about that, there seems to have been an issue with the address you are looking for.</p>
            <p className="error-text-2">Please nagivate back, or click <span id="error-text-span" onClick={() => navigate(`/`)}>HERE</span> in order to navigate to the home page.</p>
        </div>
    )
    
}

export default ErrorPage