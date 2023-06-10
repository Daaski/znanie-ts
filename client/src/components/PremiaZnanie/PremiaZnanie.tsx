import React, { useState } from 'react';

import { Menu } from './Menu';
import { Introduction } from './Introduction';
import { Info } from './Info';
import { Apply } from './Apply';
import { Stages } from './Stages';
import { PastYear } from './PastYear';
import { JurySlider } from './JurySlider';
import { Partners } from './Partners';
import { Footer } from 'components/Footer';

export const PremiaZnanie: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <main>
                {menuVisible && (
                    <Menu
                        menuVisible={menuVisible}
                        setMenuVisible={setMenuVisible}
                    />
                )}
                <Introduction
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible}
                />
                <Info />
                <Apply />
                <Stages />
                <PastYear />
                <JurySlider />
                <Partners />
            </main>
            <Footer />
        </>
    );
};
