import {useState} from 'react'
import {useSelector} from 'react-redux'

function CreatePost(){
   const [title,setTitle] = useState("Title");
   const [summary,setSummary] = useState("Summary");
   const [file,setFile] = useState("");
   const id = useSelector((state) => state.user.user_id)

   async function createNewPost(ev){
    console.log(id);
    ev.preventDefault();
    const data = new FormData();
    data.set("title",title);
    data.set("summary",summary);
    data.set("file",file[0]);
    data.set("posterId",id)
    console.log(file)
    const response = await fetch("http://localhost:5000/createPost",{
      method:'POST',
      body: data,
    })
   }
    return (
      <form onSubmit={createNewPost} id="CreatePost">
        <h1>What's on your mind?</h1>
        <div id="createPostForm">
          <input placeholder="Title"
          valye = {title}
          onChange={(ev)=> setTitle(ev.target.value)}
          type="text"></input>
          
          <input 
          placeholder="Summary"
          valye = {summary}
          onChange={(ev)=> setSummary(ev.target.value)}
          type="text"></input>

          <input 
          onChange={(ev)=>setFile(ev.target.files)}
          placeholder="Image" type="file"></input>

          <button type="submit" onClick={createNewPost}>Create Post</button>
        </div>
      </form>
    );
}
export default CreatePost;