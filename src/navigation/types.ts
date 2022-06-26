import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeStackParams = {
	Main: undefined;
	City: undefined;
	AddCity: undefined;
	Settings: undefined;
};

export type SwiperStackParam = {
	Home: undefined;
	Weather0: undefined;
	Weather1: undefined;
	Weather2: undefined;
	Weather3: undefined;
	Weather4: undefined;
	Weather5: undefined;
	Weather6: undefined;
	Weather7: undefined;
	Weather8: undefined;
	Weather9: undefined;
};

export type MainNavigation = StackNavigationProp<HomeStackParams, 'Main'>;
export type MainNavigationRoute = RouteProp<HomeStackParams, 'Main'>;
export type HomeNavigation = MaterialTopTabNavigationProp<SwiperStackParam, 'Home'>;
export type HomeNavigationRoute = RouteProp<SwiperStackParam, 'Home'>;

export type MainNavigationProp = {
	navigation: MainNavigation;
	route: MainNavigationRoute;
};

export type HomeNavigationProp = {
	navigation: HomeNavigation;
	route: HomeNavigationRoute;
};

export type compositeNavigation = CompositeNavigationProp<MainNavigation, HomeNavigation>;
