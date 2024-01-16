import React from 'react';

function Footer() {
    return (
        <div>
            {/* <footer class="text-center p-2 bg-dark text-white">2023 UNO(仮). All Rights Reserved</footer> */}
            {/* <footer class="text-center p-2" style="background-color: rgb(55, 79, 73); color: white;">2023 UNO(仮). All Rights Reserved</footer> */}
            <footer style={{ backgroundColor: 'rgb(55, 79, 73)', color: 'white' }} className="text-center p-2">
                2023 UNO(仮). All Rights Reserved
            </footer>
        </div>
    );
}

export default Footer;