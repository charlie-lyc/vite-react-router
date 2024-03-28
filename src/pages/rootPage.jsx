import { useEffect } from 'react'
import { 
    Outlet,
    Link,
    useLoaderData, 
    Form,
    redirect,
    NavLink,
    useNavigation,
    useSubmit,

} from 'react-router-dom'
import { 
    getContacts, 
    createContact, 

} from '../services/contacts'

export async function loader({ request }) {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')

    const contacts = await getContacts(q)
    // return { contacts }
    
    return { contacts, q } 
}

export async function action() {
    const contact =  await createContact()
    // return { contact }
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function RootPage() {
    // const { contacts } = useLoaderData()
    const { contacts, q } = useLoaderData()
    const navigation = useNavigation()
    const submit = useSubmit()

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

    useEffect(() => {
        document.getElementById('q').value = q
    }, [q])

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q" // <=
                            defaultValue={q}
                            onChange={(event) => {
                                // submit(event.currentTarget.form)
                                ////////////////////////////////////
                                const isFirstSearch = q === null
                                submit(event.currentTarget.form, { replace: !isFirstSearch })
                            }}
                            className={searching ? 'loading' : ''}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            // hidden={true}
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    {/* 
                        <form method="post">
                            <button type="submit">New</button>
                        </form> 
                    */}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {/* 
                        <ul>
                            <li>
                                <a href={`/contacts/1`}>Charlie</a>
                            </li>
                            <li>
                                <Link to={`/contacts/2`}>Snoopy</Link>
                            </li>
                        </ul> 
                    */}
                    {
                        contacts.length ? (
                            <ul>
                                {
                                    contacts.map((contact) => (
                                        <li key={contact.id}>
                                            {/* 
                                                <Link to={`contacts/${contact.id}`}>
                                                    {
                                                        contact.first || contact.last ? (
                                                            <>
                                                                {contact.first} {contact.last}
                                                            </>
                                                        ) : (
                                                            <i>No Name</i>
                                                        )
                                                    }
                                                    {' '}
                                                    {contact.favorite && <span>★</span>}
                                                </Link> 
                                            */}

                                            {/* Active Link Styling */}
                                            <NavLink
                                                to={`contacts/${contact.id}`}
                                                className={({ isActive, isPending }) =>
                                                    isActive ? "active" : isPending ? "pending" : ""
                                                }
                                            >
                                                {
                                                    contact.first || contact.last ? (
                                                        <>
                                                            {contact.first} {contact.last}
                                                        </>
                                                    ) : (
                                                        <i>No Name</i>
                                                    )
                                                }
                                                {' '}
                                                {contact.favorite && <span>★</span>}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (
                            <p>
                                <i>No Contacts</i>
                            </p>
                        )
                    }
                </nav>
            </div>
            <div 
                id="detail"
                // Global Pending UI
                className={navigation.state === "loading" ? "loading" : ""}
            >
                <Outlet />
            </div>
        </>
    )
}