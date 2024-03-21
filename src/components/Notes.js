import React ,{ useContext, useEffect,useRef,useState} from 'react';
import NoteContext from '../context/notes/NoteContext'; 


export default function Notes(props) {
    const context=useContext(NoteContext);
    const {notes,setnotes,deleteNote,getnotes,updateNote}=context;
    useEffect(()=>{
        getnotes();
        // eslint-disable-next-line
        
    },[]);
    const ref=useRef(null);
    const refclose=useRef(null);
    const updatenote=(currentnote)=>{
        ref.current.click();
        // setNote(currentnote)
        
        setNote({id:currentnote._id,etitle:currentnote.title,etag:currentnote.tag,edescription:currentnote.description});
    };
    const deleteNotet=(id)=>{
        deleteNote(id);
        props.showAlert("Note Deleted Successfully", "success")
    }
    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})
    const handleClick = (e)=>{
        updateNote(note.id,note.etitle,note.edescription,note.etag);
        props.showAlert("Note Updated Successfully", "success")
        refclose.current.click();
        // e.preventDefault();
        // addNote(note.title, note.description, note.tag);
        // setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    
 return (
    <>




<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">


      <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle"  name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                
               
               
            </form>




      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update changes</button>
      </div>
    </div>
  </div>
</div>




<div className="container my-3">
    <h2>Your notes:</h2>
    <div className="row">
        {Array.isArray(notes) && notes.length === 0 && <div className="col-md-4">No notes to display</div>}
        {Array.isArray(notes) && notes.slice().reverse().map((note) => (
            <div className="col-md-4" key={note._id}>
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className="card-title">{note.tag} </h6>
                        <p className="card-text">{note.description}</p>
                        <button className="btn btn-primary" onClick={() => { deleteNotet(note._id)}}>Delete</button>
                        <button className="btn btn-primary mx-3" onClick={()=>{updatenote(note)}}>update</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

    </>
       
    );
}
