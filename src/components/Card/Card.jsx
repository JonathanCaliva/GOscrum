import {useState} from 'react'

export default function Card({data,limitString, deleteCard,aditCardStatus}){

    const {title, createdAt,description,status,importance, user:{userName,},_id} = data

    const [showMore, setShowMore] = useState(false)

    const dateTime = new Date(createdAt).toLocaleString() + ' hs'
    // console.log(createdAt)


    return(
        <div className='card' >
                        <div className='close' onClick={()=> deleteCard(_id)}>
                            x
                        </div>
                        <h3>{title}</h3>
                        <h6>{dateTime}</h6>
                        <h5>{userName}</h5>
                        <button 
                            className={status.toLowerCase()} 
                            type='button'
                            onClick={()=> aditCardStatus(data)} 
                        >{status.toLowerCase()} 
                        </button>
                        <button className={importance.toLowerCase()} type='button' >{importance.toLowerCase()}</button>
                        {!showMore && <p>{limitString(description).string}</p>}
                        {showMore && 
                        <>
                            <p>{description}</p>
                            <button type='button' onClick={()=> setShowMore(false)} >Ver menos</button>
                        </>
                        }
                        {!showMore && limitString(description).addButton &&(
                            <button onClick={()=> setShowMore(true)} type='button' className='showMore' >Ver más</button>
                        )}
                    </div>
    )
}