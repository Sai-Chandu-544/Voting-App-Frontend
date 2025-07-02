import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../user/context'
import { AuthContext } from '../auth';





export const Data = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const [hasVoted,setHasVoted]=useState(null)

const {name}=useContext(UserContext)
const { logout } = useContext(AuthContext);


  const handleLogout=()=>{
    logout()
   
  }

const handleVote= async(candidateId)=>{


  
  // console.log(candidateId)
try{
  const userId = JSON.parse(localStorage.getItem("UserId"));
  const token=localStorage.getItem("Token")
  // console.log("userId",userId)
  // console.log("The Token is ",token)

  const url='https://voting-app-backend-ii6g.onrender.com/user/castVote';
  const response= await fetch(url,{
    method:"POST",
    headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({userId,candidateId})

  })

  const data=await response.json();
  // console.log(data)
  

  if(response.status===401){
    alert(data.message || "You Already Casted Your Vote!")
  }else if(response.status===200){
    alert( "Your Vote has benn Casted  Successfully")
    setHasVoted(candidateId)
  }
  else{
    alert("Something went wrong!")
  }

}catch(err){
  alert("Internal Server Error")
}
 

}





  useEffect(() => {
    const token = localStorage.getItem("Token");

    const fetchList = async () => {
      setLoading(true)
      try {
        const url = "https://voting-app-backend-ii6g.onrender.com/user/list";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
           
        });

        const result = await response.json();
        setLoading(false)
       
        console.log("Fetched Data:", result);
        setData(result);

      } catch (err) {
        console.error("Fetch Error:", err);
        alert("Error fetching items.");
      }
    };

    fetchList();
  }, []);
 




  return (
  <>
  <div className="first-container">
    <div className="title">
       <strong>List of Candidates</strong>
       

    </div>
   <div className="container">
    <div className="name">
    <div className="Name">
      <p>User:</p>

    </div>
    <div className="value">
      <p>{name}</p>

    </div>
   
      

    </div>
    
   <div className="logout">
    <p onClick={handleLogout}>Logout</p>
   </div>

   </div>
   
    
     
  </div>
  {
   
    loading?
    ( <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
      ):(
        <>
        
        <div className="list-main-container">
    <div className="second-container">
      <ul>
        {data.map((el, index) => (
          <li key={index}>
            <div className="third-container">
              <div className="left">
                <img src={el.imageUrl} alt={el.name} />
              </div>

              <div className="middle">
                <h2>Name: <span>{el.name}</span></h2>
                <h2>Dept: <span>{el.party}</span></h2>
                <h2>Age: <span>{el.age}</span></h2>
              </div>

              <div className="right">
              <button
  onClick={() => handleVote(el._id)}
  style={{
    backgroundColor: hasVoted === el._id ? "brown" : "#3498db",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  {hasVoted === el._id ? "Voted" : "Vote"}
</button>

              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
        </>
      )
  }

  
</>


  );
};
