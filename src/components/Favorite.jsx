import { 
    Form,
    useFetcher,

} from 'react-router-dom'

function Favorite({ contact }) {
    const fetcher = useFetcher()

    // yes, this is a `let` for later
    let favorite = contact.favorite
    if (fetcher.formData) {
        favorite = fetcher.formData.get('favorite') === 'true'
    }

    return (
        <>
            {/* 
                <Form method="post">
                    <button
                        name="favorite"
                        value={favorite ? 'false' : 'true'}
                        aria-label={
                            favorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                    >
                        {favorite ? '★' : '☆'}
                    </button>
                </Form> 
            */}
            <fetcher.Form method="post">
                <button
                    name="favorite"
                    value={favorite ? 'false' : 'true'}
                    aria-label={
                        favorite
                        ? 'Remove from favorites'
                        : 'Add to favorites'
                    }
                >
                    {favorite ? '★' : '☆'}
                </button>
            </fetcher.Form>
        </>
    )
}

export default Favorite