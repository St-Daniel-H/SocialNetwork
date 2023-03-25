import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userDefaultImage from '../Home/default_profile_picture.png';
import { useSelector } from 'react-redux';

function UserProfile() {
  const { id } = useParams();

  let screen_user_Id = useSelector((state) => state.user.user_id);
  const [name, setName] = useState('Unavailable');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [file, setFile] = useState('');

  async function getUserNameAndImage() {
    const req = await fetch('http://localhost:5000/api/FindUserId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await req.json();
    if (data.status === 'Ok') {
      setName(data.name);
      setImage('/' + data.picture);
      setBio(data.bio);
      console.log('the data of the picture: ' + data.picture);
    } else {
      alert(data.error);
    }
  }
  async function updateUserProfilePicture(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('file', file[0]);
    data.set('userId', id);
    console.log(file);
    const req = await fetch(
      'http://localhost:5000/api/updateUserProfilePicture',
      {
        method: 'POST',
        body: data,
      }
    );
    const res = await req.json();
    if (res.status === 'Ok') {
      alert('Image updated');
    } else {
      alert(res.error);
    }
  }
  useEffect(() => {
    getUserNameAndImage();
    console.log(image);
  }, []);
  console.log(id);
  return (
    <div id='UserProfile'>
      <div id='leftSide'>
        <img src={image == '/' ? userDefaultImage : image}></img>
        <h1>{name}</h1>{' '}
        <form onSubmit={updateUserProfilePicture}>
          <input
            onChange={(ev) => setFile(ev.target.files)}
            placeholder='Image'
            type='file'
            accept='image/x-png,image/gif,image/jpeg'
            required
          ></input>
          <button type='submit'>Update profile Picture</button>
        </form>
        <p>{bio}</p>
      </div>
      <div id='rightSide'></div>
    </div>
  );
}
export default UserProfile;
