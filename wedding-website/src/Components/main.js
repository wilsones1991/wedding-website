function Main() {
    return (
        <main>
            <span id="the-story" className="anchor"></span>
            <section className="about-us">
                <div id="bio">
                    <h2>The Story</h2>
                    <p>It all started with a moose.</p>
                    <p>During his family vacation to visit his uncles Michael and Mateo, Eric was determined to find a moose. He was ecstatic to realize his dreams while biking with his dad and uncles in Kincaid park.</p>
                    <div className="par-img-wrapper">
                        <img src="images/eric-moose.jpeg" alt="" />
                    </div>
                    <p>In January of 2020, Kylie saw this picture on Eric's Hinge profile, and their relationship began to bloom. A couple of months later, Kylie joined Eric and his band on their tour of Austin during South by Southwest. The tour would be cut short, though, by the sudden lockdowns at the beginning of the pandemic.</p>
                    <p>Kylie and Eric knew this was a pivotal moment, and they are both so grateful to have invested in their relationship during the trying times of the pandemic. They bonded over the next year during long road trips to places like Olympic National Park and the Rocky Mountains, and they embraced teaching online together for an entire school year.</p>
                    <p>On April 6, 2022, Eric proposed to Kylie at the end of the Road to Hana in Maui, where they had been travelling during their Spring Break. They are so excited to start this next journey together and look forward to seeing you at their wedding.</p>
                </div>
            </section>
            <span id="details" className="anchor"></span>
            <section className="details">
                <h2>Details</h2>
                <table>
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
                            <td>{`The Beach House at Lake Temescal
                                6500 Broadway Terrace
                                Oakland, CA 94618`}
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </section>
    </main>
    )
}

export default Main