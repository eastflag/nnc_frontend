import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Samples</h1>
            <ul>
                <li>
                    <Link to='/samples/mui-sample'>MUI sample</Link>
                </li>
                <li>
                    <Link to='/samples/counter'>redux toolkit sample</Link>
                </li>
                <li>
                    <Link to='/samples/react-hook-form'>react-hook-form sample</Link>
                </li>
                <li>
                    <Link to='/samples/image-upload'>image-upload</Link>
                </li>
            </ul>
        </div>
    );
}