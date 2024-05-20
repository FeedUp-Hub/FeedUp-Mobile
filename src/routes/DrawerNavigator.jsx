import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from '../routes/CustomDrawerContent';
import TermsUsage from '../components/UsageTerms';
import Metrics from '../layouts/Metrics';
import NozesTrading from '../extrasFuture/NozesTrading';
import Login from '../layouts/LoginScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={BottomTabNavigator} />
    <Drawer.Screen name="Termos de Uso" component={TermsUsage} />
    <Drawer.Screen name="Métricas" component={Metrics} />
    <Drawer.Screen name="Ioasys Trade (soon)" component={NozesTrading} />
    <Drawer.Screen name="Logout" component={Login} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
