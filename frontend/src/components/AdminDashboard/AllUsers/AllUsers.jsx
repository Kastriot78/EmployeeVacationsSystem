const AllUsers = ({ users, loading }) => {
    return (
        <>
            {loading ? <tr>
                <td className="skeleton_line"></td>
            </tr> : users?.map((user) => <tr key={user?._id}>
                <td>
                    <div className="d-flex align-middle">
                        <div className='d-inline-block'>
                            <h6>{user?.name}</h6>
                            <p className='mb-0 tx-13 tetx-muted'>Role: {user?.isAdmin ? 'Admin' : 'User'}</p>
                        </div>
                    </div>
                </td>
                <td className='text-end'>
                    <div className="d-inline-block">
                        <p className='mb-0 tx-13 text-muted'>{new Date(user?.createdAt).toLocaleString()}</p>
                    </div>
                </td>
            </tr>)}
        </>
    )
}

export default AllUsers;
