import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryScreen from './CategoryScreen';
import ExpirationScreen from './ExpirationScreen';
import UrgentScreen from './UrgentScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="유통기한별" component={CategoryScreen} />
            <Tab.Screen name="소비기한별" component={ExpirationScreen} />
            <Tab.Screen name="임박상품" component={UrgentScreen} />
        </Tab.Navigator>
    );
}
