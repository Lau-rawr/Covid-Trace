import React, { useState} from 'react';
import { Card, Button, CardDeck, Collapse, Carousel } from 'react-bootstrap';

export default function Resources() {

    // Sources:
    // https://mdbootstrap.com/docs/jquery/javascript/carousel/ 
    // https://mdbootstrap.com/docs/jquery/navigation/footer/
    // https://www.w3schools.com/bootstrap4/bootstrap_cards.asp
    // https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp
    
    // for collapsable buttons 
    const [openOne, setOpenOne] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [openThree, setOpenThree] = useState(false);

    return (
        <div>
        <div>
        {/* Carousel with Covid-19 related images */}
        <Carousel>
        <Carousel.Item interval={4000} id = "carousel">
            <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/S_Bqdn_W0z8/maxresdefault.jpg"
            alt="Protect Yourself"
            />
            <Carousel.Caption>
            <h3 id="headerTwo">Protect Yourself</h3>
            <p>Wash your hands often.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000} id = "carousel">
            <img
            className="d-block w-100"
            src="https://s3.amazonaws.com/cms.ipressroom.com/338/files/20205/5ef4a06b2cfac20a22a6b23d_Woman+wearing+a+mask/Woman+wearing+a+mask_295f0f35-e37d-4adc-b957-44e9d640194a-prv.jpg"
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3 id="headerTwo">Wear a Mask</h3>
            <p>Masks slow the spread of COVID-19.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000} id = "carousel">
            <img
            className="d-block w-100"
            src="https://www.safetyandhealthmagazine.com/ext/resources/images/news/concepts/social-distance.jpg?1584560532"
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3 id="headerTwo">Practice Social Distancing</h3>
            <p>COVID-19 can spread among people who are in close contact (around 6 feet) for a prolonged period.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel> 
        </div>
        <div>
        <h2>Resources</h2>
        {/* Cards with collapsable buttons */}
        <CardDeck>
        <Card>
            <Card.Img variant="top" src="https://www.dhs.gov/sites/default/files/images/opa/20_0406_opa_coronavirus-thumbnail-hhs-cdc.jpg" />
            <Card.Body>
            <Card.Title>Centers for Disease Control and Prevention</Card.Title>
            <>
            <Button
                onClick={() => setOpenOne(!openOne)}
                aria-controls="example-collapse-text"
                aria-expanded={openOne}
            >
                CDC Tips
            </Button>
            <Collapse in={openOne}>
                <div id="example-collapse-text">
                <ul id="list">
                    <li>Cover your mouth and nose with a mask when around others</li>
                    <li>Cover coughs and sneezes</li>
                    <li>Clean and disinfect</li>
                    <li>Monitor Your Health Daily</li>
                </ul>
                </div>
            </Collapse>
            </>
            </Card.Body>
            <Card.Footer>
            <Card.Link href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html" target="_blank">CDC COVID-19 Website</Card.Link>
            <p><span id="number">COVID Hotline: 1-800-232-4636</span></p>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="https://ewscripps.brightspotcdn.com/dims4/default/e7bc069/2147483647/strip/true/crop/482x271+15+0/resize/1280x720!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F2a%2F25%2F8805e58c4fd997fb312dbca8f6dc%2Ffema.jpg" />
            <Card.Body>
            <Card.Title>Federal Emergency Management Agency</Card.Title>
            <>
            <Button
                onClick={() => setOpenTwo(!openTwo)}
                aria-controls="example-collapse-text"
                aria-expanded={openTwo}
            >
                How You Can Help
            </Button>
            <Collapse in={openTwo}>
                <div id="example-collapse-text">
                <ul id="list">
                    <li>Donate Money and In-Kind Goods</li>
                    <li>Donate Blood or Plasma</li>
                    <li>Volunteer</li>
                    <li>Donate Supplies and Equipment</li>
                </ul>
                </div>
            </Collapse>
            </>
            </Card.Body>
            <Card.Footer>
            <Card.Link href="https://www.fema.gov/disasters/coronavirus" target="_blank">FEMA COVID-19 Website</Card.Link>
            <p><span id="number">FEMA Helpline: 1-800-621-3362</span></p>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Img variant="top" src="https://www.whitehouse.gov/wp-content/uploads/2017/11/WhiteHouse-Faded-1387x720.jpg"/>
            <Card.Body>
            <Card.Title>White House</Card.Title>
            <>
            <Button
                onClick={() => setOpenThree(!openThree)}
                aria-controls="example-collapse-text"
                aria-expanded={openThree}
            >
                Common Symptoms of COVID-19
            </Button>
            <Collapse in={openThree}>
                <div id="example-collapse-text">
                <ul id="list">
                    <li>Cough</li>
                    <li>Shortness of breath or difficulty breathing</li>
                    <li>Fever</li>
                    </ul> 
                    <ul id="list">
                    <li>Repeated shaking with chills</li>
                    </ul>
                    <ul id="list">
                    <li>Muscle or body aches</li>
                    <li>Sore throat</li>
                    <li>New loss of taste or smell</li>
                    <li>Congestion or runny nose</li>
                    <li>Nausea or vomiting</li>
                    <li>Chills</li>
                    <li>Diarrhea</li>
                </ul>
                </div>
            </Collapse>
            </>
            </Card.Body>
            {/* Footer with link to Covid-Trace GitHub Pages Website */} 
            <Card.Footer>
            <Card.Link href="https://www.coronavirus.gov/" target="_blank">White House COVID-19 Website</Card.Link>
            <p><Card.Link href="https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html" target="_blank">Find a Testing Site</Card.Link></p>
            </Card.Footer>
        </Card>
        </CardDeck>
        </div>
        <div>
        <footer >
        <div class="footer-copyright text-center py-3">© 2020 Copyright:
        <a id="website" href="https://pages.github.ccs.neu.edu/2020FACS5500SV/project-Covid-trace/" target="_blank"> www.Covid-Trace.com</a>
        </div>

        </footer>
        </div>
        </div>
    )
}