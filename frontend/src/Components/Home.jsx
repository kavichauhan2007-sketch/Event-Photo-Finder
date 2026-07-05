import { CloudLightning, CloudUpload, Crop, Loader, Lock, LucideCrop, Scan, ShieldCheck, SquareUserRound, Stars, UserRound, ZodiacGemini } from 'lucide-react'
import { re } from 'mathjs'
import React, { useRef, useState } from 'react'
import "../App.css"
import { useNavigate } from 'react-router-dom'
const Home = () => {

    const imgref = useRef()
    const eventid = useRef()
    const navigator = useNavigate();
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState("")
    const [event_name, seteventname] = useState("")
    const [photoMode, setPhotoMode] = useState("mine");



    async function handleChange(e) {
        const url = URL.createObjectURL(e.target.files[0])
        imgref.current.src = url
    }

    function handleEventname() {
        seteventname(eventid.current.value)
        console.log(event_name)

    }
    async function handleSubmit(e) {
        e.preventDefault()

        if (event_name == "" || eventid.current.value == "") {
            setmessage("Please Enter Event name")

        }

        else if (imgref.current.src == "http://localhost:5173/p.png") {
            setmessage("Please select your image")

        }


        else {
            console.log(event_name)
            setloading(true)
            setmessage("")
            const formdata = new FormData();
            formdata.append("file", e.target.elements.file.files[0])
            console.log(imgref.current)
            formdata.append("event_name", event_name)
            formdata.append("photo_mode", photoMode);



            console.log(event_name)

            try {
                const result = await fetch("http://127.0.0.1:8000/get_similar", {
                    method: "POST",
                    body: formdata
                })
                const data = await result.json()

                console.log(data)
                setloading(false)
                if (data.message == "Invalid event name") {
                    setmessage("Invalid event name")
                }
                else {
                    navigator("/Gallery", {
                        state: {
                            match: data.matches
                        }
                    })
                }
            }

            catch (error) {
                setloading(false)
                setmessage("Server Error")
            }


        }

    }

    return (
        <div className='h-[90vh] p-[1vw] bg-[#0b0b0b21] gap-5  justify-center flex'>
            <div className="bg-[rgba(98,43,209,0.16)] p-[1.5vw] rounded-4xl flex-wrap w-[55vw]  left flex">

                <div className="flex justify-center  rounded-2xl p-[0.7vw] gap-2  bg-[rgb(97,43,209,0.3)] h-min">
                    <Stars stroke='rgb(93,47,209)' fill='rgb(93,47,209)' />
                    <p className='text-[1.5vw] text-[rgb(93,47,209)]'>AI PHOTO FINDER</p>
                </div>

                <div className="p-[1vw] text-[4.5vw] font-bold w-[90%]">
                    <h1>Find Yours photo from the <h1 className='inline text-[rgb(93,47,209,0.8)]'> event collections</h1></h1>
                </div>


                <p className='p-[1vw] text-[1.5vw] w-[70%] text-gray-400'>Upload a selfie and AI will find all the photos ffrom the event that you are in </p>

                <div className="p-[1vw] flex rounded-2xl my-5 gap-2 w-full">
                    <div className="hover:bg-[rgb(97,43,209)] hover:cursor-pointer flex border-[rgb(97,43,209)] border-2 rounded-2xl flex-col items-center  gap-2 p-[0.7vw]">
                        <SquareUserRound size={50} />
                        <div className="">
                            <h1 className='text-[1.7vw] font-bold'>AI Detection</h1>
                        </div>
                    </div>

                    <div className="flex hover:bg-[rgb(97,43,209)] hover:cursor-pointer  flex-col border-[rgb(97,43,209)] border-2 rounded-2xl items-center gap-2  p-[0.7vw]">
                        <ShieldCheck size={50} />
                        <div className="">
                            <h1 className='text-[1.7vw] font-bold'>100% Privacy</h1>
                        </div>
                    </div>

                    <div className="flex hover:bg-[rgb(97,43,209)] hover:cursor-pointer  flex-col border-[rgb(97,43,209)] border-2 rounded-2xl items-center gap-2  p-[0.7vw]">
                        <CloudLightning size={50} />
                        <div className="">
                            <h1 className='text-[1.7vw] font-bold'>Fast Accurate</h1>
                        </div>
                    </div>
                </div>



            </div>


            <div className="py-[10px] bg-[rgba(98,43,209,0.16)] rounded-3xl w-[39vw] flex flex-col items-center justify-between relative">
                <div className="text-center">
                    <h1 className='font-bold text-[1.7vw]'>Upload Your Photo</h1>
                    <p className='text-gray-400 text-[1.5vw]'>We'll find you in all event photos</p>
                </div>  <Scan className='absolute top-[5vw]' size="20vw" strokeWidth={0.5} />
                <img ref={imgref} src="/p.png" className=' bg-amber-100 p-[10px] rounded-[200px] absolute top-[10vw]  h-[10vw] w-[10vw]' alt="" />

                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <div className="flex flex-col gap-5">
                        <p className='text-[1vw] text-red-600'>{message}</p>
                        <input ref={eventid} onChange={handleEventname} className='border-b-2 items-center rounded-[25px] p-[10px] text-[1vw] bg-[#0000004d]' type="text" placeholder='Event id' />


                        <div className="w-[30vw] bg-[#0000004d] rounded-2xl p-4">
                            <p className="text-[1vw] mb-3 font-medium">Photos to Display</p>

                            <div className="flex gap-8">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="photoMode"
                                        value="mine"
                                        checked={photoMode === "mine"}
                                        onChange={(e) => setPhotoMode(e.target.value)}
                                        className="accent-[rgb(97,43,209)]"
                                    />
                                    <span className="text-[1vw]">Only My Photos</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="photoMode"
                                        value="all"
                                        checked={photoMode === "all"}
                                        onChange={(e) => setPhotoMode(e.target.value)}
                                        className="accent-[rgb(97,43,209)]"
                                    />
                                    <span className="text-[1vw]">All Photos</span>
                                </label>
                            </div>
                        </div>


                        <label for="file"> <div className="hover:opacity-60 flex gap-3 cursor-pointer justify-center rounded-2xl p-[0.7vw] w-[30vw] bg-gradient-to-r from-[rgb(97,43,209)] to-purple-400 text-[1.7vw]">
                            <CloudUpload size={30} />
                            <input onChange={handleChange} type="file" name="file" id="file" className='hidden' />
                            <div className='text-[1.5vw]' type="submit">Upload</div>
                        </div></label>

                        <button className=' ' type="submit"> <div className="hover:opacity-60 flex items-center cursor-pointer gap-3 justify-center rounded-2xl p-[0.7vw] w-[30vw] bg-gradient-to-r from-[rgb(97,43,209)] to-purple-400 text-[1.5vw]">
                            {!loading ? <><Stars size={20} fill='white' />Find</> : <Loader className=' rotate' size={40} />}
                        </div></button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Home
