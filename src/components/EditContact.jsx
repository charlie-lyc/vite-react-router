import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate, 

} from 'react-router-dom'
import { updateContact } from '../services/contacts'

export async function action({ request, params }) {
    const formData = await request.formData()
    /**********************************************/
    // const updates = {
    //     first: formData.get('first'),
    //     last: formData.get('last'),
    //     twitter: formData.get('twitter'),
    //     avatar: formData.get('avatar'),
    //     notes: formData.get('notes')
    // }
    /**********************************************/
    const updates = Object.fromEntries(formData)
    /**********************************************/
    await updateContact(params.contactId, updates)
    return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
    const { contact } = useLoaderData()
    const navigate = useNavigate()

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First Name"
                    aria-label="First name"
                    type="text"
                    name="first" // <= 1
                    defaultValue={contact.first}
                />
                <input
                    placeholder="Last Name"
                    aria-label="Last name"
                    type="text"
                    name="last" // <= 2
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter" // <= 3
                    placeholder="@jack"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar" // <= 4
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes" // <= 5
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button 
                    type="button"
                    onClick={() => { navigate(-1) }}
                >Cancel</button>
            </p>
        </Form>
    )
}