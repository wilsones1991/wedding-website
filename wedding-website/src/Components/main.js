import React from 'react'

function Main() {
    return (
        <main>
            <span id="the-story" className="anchor"></span>
            <section className="about-us">
                <div id="bio">
                    <h2>Our Story</h2>
                    <p>
                        We had the great fortune to meet just weeks before the
                        Pandemic took hold of the world. Over the course of just
                        a few weeks, our dates quickly transitioned from cider
                        tasting in Sonoma, skiing in Shasta, and discussing
                        Eric's tour logistics at breweries; to setting up lawn
                        chairs in the driveway 6 feet apart and reassuring each
                        other that the world be back to “normal” soon. As the
                        weeks passed and both the virus and the CDC guidelines
                        evolved, our relationship did too. By late Spring 2020,
                        we accepted that “normal” was a thing of the past and we
                        officially became a part of each others bubble.
                    </p>
                    <p>
                        From that pivotal point, we were rarely more than six
                        feet apart. We embarked on road trips to destinations
                        such as the Pacific Northwest, Western Montana and
                        Southern California. We hiked all over California and
                        mountain biked whenever possible. We learned to adapt to
                        our new role as virtual educators/tech support for our
                        students. As time passed, our bubble grew larger and our
                        families grew closer. We were thrilled to finally be
                        able to safely fly again and we spent the month of July
                        2021 visiting Eric's family and friends in Nashville and
                        Rugby, TN; Yellow Springs, Ohio; and finally Asheville,
                        NC. We then returned to in person teaching for the
                        2021-22 school year and we supported students in
                        readjusting to life at school. We then spent the most
                        recent summer traveling in New Zealand finally being
                        able to visit Kylie’s sister Meredith.
                    </p>
                    <p>
                        On April 6, 2022, Eric proposed to Kylie at the end of
                        the journey of The Road to Hana in Maui.
                    </p>
                    <p>
                        We are thrilled to have the privilege to invite you to
                        be a part of the the ultimate bubble, our wedding
                        celebration!
                    </p>
                </div>
            </section>
            <span id="details" className="anchor"></span>
            <section className="details">
                <h2>Details</h2>
                <table className="details-table">
                    <tbody>
                        <tr>
                            <th>Date: </th>
                            <td>December 30, 2022</td>
                        </tr>
                        <tr>
                            <th>Time: </th>
                            <td>2:00 PM to 5:00 PM</td>
                        </tr>
                        <tr>
                            <th>Where: </th>
                            <td>
                                <pre>
                                    <a
                                        href="https://goo.gl/maps/DvpSNLeicwR5Nypy7"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {`The Beach House at Lake Temescal
6500 Broadway Terrace
Oakland, CA 94618`}
                                    </a>
                                </pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Main
