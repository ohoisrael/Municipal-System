import { Button, Textarea } from 'flowbite-react';

export default function DashComplaint() {
  return (
    <div className="p-3 max-w-lg mx-auto w-full">
        
        <img src='ledz.jpg' className='h-40 mx-auto' alt='img'/>
        
    <h1 className="text-center text-3xl my-7 font-semibold">Report Complaint</h1>
    <form className="">
      
    <div className="">
      <Textarea
        theme="snow"
        placeholder="Tell us your issue"
        className="h-72 mb-12 text-black"
        required
      />
      </div>
      <Button type="submit" className='w-full'>Submit</Button>
    </form>
  </div>
  )
}
