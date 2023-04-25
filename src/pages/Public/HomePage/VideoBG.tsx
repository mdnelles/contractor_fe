import home from "../../../assets/home.mov";
import "../../../App.css";

export default function VideoBG() {
   return (
      <div className='main'>
         <div className='overlay'>dddd</div>
         <video className='video' src={home} autoPlay loop muted />
      </div>
   );
}
