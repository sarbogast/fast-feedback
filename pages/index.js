import {useAuth} from '../lib/auth';
import {useState} from "react";

export default function Index() {
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);

    return auth.user ? (
        <div>
            <p>Email: {auth.user.email}</p>
            <p>Name: {auth.user.name}</p>
            <p>{auth.user.photoUrl && <img src={auth.user.photoUrl}/>}</p>
            <button onClick={(e) => auth.signout()}>Sign Off</button>
        </div>
    ) : (
        <div>
            <input type="email" placeholder="Email address" name="email" value={email}
                   onChange={(e) => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" name="password" value={password}
                   onChange={(e) => setPassword(e.target.value)}/><br/>
            <button onClick={(e) => auth.signinWithEmail(email, password)}>Sign in with email</button><br/>
            <input type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
            {passwordError && <p>{passwordError}</p>}
            <button onClick={(e) => {
                if(confirmPassword === password) {
                    setPasswordError(null);
                    auth.signUp(email, password);
                } else {
                    setPasswordError('Passwords don\'t match!');
                }
            }}>Sign up with email</button>
            <br/>
            <button onClick={(e) => auth.signinWithGithub()}>Sign In with Github</button>
            <br/>
            <button onClick={(e) => auth.signinWithGoogle()}>Sign In with Google</button>
        </div>
    );
}