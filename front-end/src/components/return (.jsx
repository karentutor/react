        return (
            <>
                {/* `        < !--collection -- >` */}
                <section className="bg-secondary py-4">
                    <div className="container-fluid">
                        {/* <!-- title--> */}
                        <div className="row text-center text-white">
                            <div className="col m-4">
                                <h1 className="display-4 mb-4">Resume</h1>
                                <div className="underline mb-4"></div>
                                <h3 >Our Entries</h3>
                            </div>
                        </div>
                        {/* <!-- end of title-->

            <!-- row --> */}
                        <div className="row text-center">
<table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">PhoneNumber</th>
      <th scope="col">Content</th>
    </tr>
  </thead>
                                <tbody>
                                    {entries.map((entry) => (
                                        <tr>
                                            <th scope="row">{entry.id}</th>
                                            <td>{entry.name}</td>
                                            <td>{entry.email}</td>
                                            <td>{entry.phoneNumber}</td>
                                        </tr>
                                    ))}
    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
</table>
                        </div>
                        {/* <!-- end row --> */}
                    </div>

                </section>
                {/* <!-- end collection --> */}
            </>
        );
