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
                        pandemic took hold of the world. Over the course of just
                        a few weeks, our dates quickly transitioned from cider
                        tasting in Sonoma, skiing in Shasta, and discussing
                        Eric's tour logistics at breweries to setting up lawn
                        chairs in the driveway 6 feet apart. As the weeks passed and both the virus and the CDC
                        guidelines evolved, our relationship did too. By late
                        Spring 2020, we accepted that “normal” was a thing of
                        the past, and we officially became a part of each others
                        bubble.
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
                        able to safely fly again, and we spent the month of July
                        2021 visiting Eric's family and friends in Nashville and
                        Rugby, Tennessee; Yellow Springs, Ohio; and Asheville,
                        North Carolina. We returned to in-person teaching
                        for the 2021-22 school year, and we supported students
                        in readjusting to life at school. Most recently, we
                        spent the summer traveling in New Zealand finally being
                        able to visit Kylie's sister Meredith.
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
                            <td>1:00 PM to 5:00 PM</td>
                        </tr>
                        <tr>
                            <th>Attire: </th>
                            <td>Winter Garden Festive</td>
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
                <p className="centeredParagraph">We request for all guests to be vaccinated against COVID-19.</p>
            </section>
            <section className="parking">
            <h2>Directions and Parking</h2>
            <p>There is limited parking located just above the North Lot that will be available on a first-come, first-serve basis. Otherwise, the North Lot is a short walk away (less than 5 minutes) from the Beach House. More details:</p>
            <ul className="linksList">
                <li className="biggerList"><a href="https://www.ebparks.org/sites/default/files/BeachHouse-MapParking-2021.jpg" target="_blank">Beach House Parking Lot Map</a></li>
                <li className="biggerList"><a href="https://www.ebparks.org/rentals-and-permits/event-venues/beach-house#:~:text=NEXT-,About%20the%20Facility,-Opened%20to%20the" target="_blank">Beach House Facility Information</a></li>
            </ul>
            
            <h3>To reach the Beach House</h3>
            <p>Temescal Beach House is located in the Temescal Regional Recreation Area near the intersection of Hwy 13 and Hwy 24 in Oakland between Broadway Terrace and Keith Avenue/Broadway.</p>
            <h3 className="byCar">By Car</h3>
            <h4>From eastbound Highway 24 in Oakland:</h4>
            <p>Exit at Broadway. At the light, make a wide left turn onto Broadway and immediately bear right. DO NOT go under the freeway. Follow Broadway approximately one mile to the Temescal parking area on the right.</p>
            <h4>From westbound Highway 24 in Oakland:</h4>
            <p>If you are approaching from the Walnut Creek area, go through the Caldecott Tunnel in the RIGHT LANE of the right tunnel. As you exit the tunnel, take the Tunnel Road exit, then turn left onto the freeway overpass (Caldecott Lane), turn right onto Broadway. Proceed .7 mile to the Park entrance on the left.</p>
            <h4>From northbound Highway 13 in Oakland:</h4>
            <p>Take Highway 13 to Highway 24 East (toward the Caldecott Tunnel). Stay in the right lane. Take Old Tunnel Road exit, keep right (now on Broadway). Go .7 mile to the Park Entrance on the left.</p>
            </section>
        </main>
    )
}

export default Main
