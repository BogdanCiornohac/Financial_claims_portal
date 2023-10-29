

export default function TicketForm() {
    console.log('form')
    return (
        <form action="localhost:3000/api/tickets" method="POST" encType="multipart/form-data">
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="text" placeholder="Description" required />
            <input type="file" name="file" placeholder="PDF" />
            <button>Submit</button>
        </form>
    )
}