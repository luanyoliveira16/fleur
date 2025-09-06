import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../app/(tabs)/index';
import Conteudo from './Conteudo';
import Configuracoes from './Configuracoes';
import Sair from './Sair';

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Conteúdo" component={Conteudo} />
            <Tab.Screen name="Configurações" component={Configuracoes} />
            <Tab.Screen name="Sair" component={Sair} />

        </Tab.Navigator>
    )
}