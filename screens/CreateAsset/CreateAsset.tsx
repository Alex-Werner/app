// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet } from 'react-native';
//
// import { Text, View } from '../../components/Themed/Themed';
// import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
// import {useEffect, useMemo, useState} from "react";
// import {fetchAddressBalance} from "../../utils";
// import Background4 from "../../components/Background4/Background4";
//
// export default function WalletScreen() {
//     const mnemonic = useStoreState((state)=>state.wallet.mnemonic);
//     const address = useStoreState((state)=>state.accounts[0].address)
//     const balanceState = useStoreState((state)=>state.accounts[0].balance)
//     const updateAccount = useStoreActions((actions) => actions.updateAccount);
//
//     function updateStoreState(){
//         updateAccount({index:0, balance: balance})
//     }
//     const [balance, setBalance] = useState(balanceState);
//
//     useEffect(() => {
//         async function fetch() {
//             const fetchedBalance = await fetchAddressBalance(address);
//             console.log({fetchedBalance});
//             setBalance(fetchedBalance);
//         }
//         fetch();
//     }, [updateStoreState]);
//     return (
//         <View style={styles.container}>
//             <Background4>
//             <Text style={styles.title}>Balance</Text>
//             <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//             <Text>Wallet</Text>
//             <Text>Mnemonic: {mnemonic}</Text>
//             <Text>Address: {address}</Text>
//             <Text>Balance: {(parseFloat(balance)/1e18)}</Text>
//
//             {/* Use a light status bar on iOS to account for the black space above the modal */}
//             <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//             </Background4>
//             </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     separator: {
//         marginVertical: 30,
//         height: 1,
//         width: '80%',
//     },
// });

import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Button, Pressable, Image, TextInput, SafeAreaView, Animated} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
import React, {useEffect, useMemo, useState} from "react";
import {fetchAddressBalance} from "../../utils";
import Background4 from "../../components/Background4/Background4";
import {
    useFonts,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {
    Roboto_900Black
} from '@expo-google-fonts/roboto';
import Web3 from "web3";
import {Navigation} from "../../types";


type Props = {
    navigation: Navigation;
};

export default function CreateAssetScreen({navigation}: Props) {
    // const mnemonic = useStoreState((state) => state.wallet.mnemonic);
    // const address = useStoreState((state) => state.accounts[0].address)
    // const username = useStoreState((state)=>state.accounts[0].username)
    // const username = useStoreState((state) => state.user.username)
    // const balanceState = useStoreState((state) => state.accounts[0].balance)
    // const updateAccount = useStoreActions((actions) => actions.updateAccount);

    const [username, onChangeUsername] = React.useState('');
    const [amount, onChangeAmount] = React.useState(0);
    const [title, onChangeTitle] = React.useState('');

    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });

    const performNFTMint = async function () {
        // const path = `http://localhost:3001/identity/${_username}`;
        console.log(`Mint NFT`, { title });
    }

    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Create asset</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.secondTitle}>Title</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTitle}
                        value={title}
                        placeholder="Enter a title"
                    />
                </SafeAreaView>
                <Text style={styles.secondTitle}>Image</Text>

                <View style={{flex: 0.8, marginTop: 20}}>
                    <Image style={{width: '80vw', height: 30, flex:1}} resizeMode="cover"
                           source={require('../../assets/images/nft-superA-SnowShite.png')}
                        />
                </View>
                <Pressable
                    onPress={async () => {
                        await performNFTMint();
                        console.log('Create NFT request',title);
                        return navigation.navigate( "CreateAssetConfirm");
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Create</Text>
                </Pressable>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
            </Background4>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView: {
        flexDirection: 'row'
    },
    button: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        color: '#000000',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    secondTitle: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    buttonImage: {
        padding: 10
    },
    iconImage: {
        width: 30, height: 30, margin: 10
    },
    section: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "flex-start",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    noAssetText: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },


    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});