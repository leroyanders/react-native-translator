import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Appbar } from "react-native-paper";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  I18nManager,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Share,
} from "react-native";
import * as Speech from "expo-speech";
import * as Clipboard from "expo-clipboard";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const transliterate = (word) => {
  var answer = "",
    a = {};

  a["Ё"] = "YO";
  a["Й"] = "I";
  a["Ц"] = "TS";
  a["У"] = "U";
  a["К"] = "K";
  a["Е"] = "E";
  a["Н"] = "N";
  a["Г"] = "G";
  a["Ш"] = "SH";
  a["Щ"] = "SCH";
  a["З"] = "Z";
  a["Х"] = "H";
  a["Ъ"] = "'";
  a["ё"] = "yo";
  a["й"] = "i";
  a["ц"] = "ts";
  a["у"] = "u";
  a["к"] = "k";
  a["е"] = "e";
  a["н"] = "n";
  a["г"] = "g";
  a["ш"] = "sh";
  a["щ"] = "sch";
  a["з"] = "z";
  a["х"] = "h";
  a["ъ"] = "'";
  a["Ф"] = "F";
  a["Ы"] = "I";
  a["В"] = "V";
  a["А"] = "a";
  a["П"] = "P";
  a["Р"] = "R";
  a["О"] = "O";
  a["Л"] = "L";
  a["Д"] = "D";
  a["Ж"] = "ZH";
  a["Э"] = "E";
  a["ф"] = "f";
  a["ы"] = "i";
  a["в"] = "v";
  a["а"] = "a";
  a["п"] = "p";
  a["р"] = "r";
  a["о"] = "o";
  a["л"] = "l";
  a["д"] = "d";
  a["ж"] = "zh";
  a["э"] = "e";
  a["Я"] = "Ya";
  a["Ч"] = "CH";
  a["С"] = "S";
  a["М"] = "M";
  a["И"] = "I";
  a["Т"] = "T";
  a["Ь"] = "'";
  a["Б"] = "B";
  a["Ю"] = "YU";
  a["я"] = "ya";
  a["ч"] = "ch";
  a["с"] = "s";
  a["м"] = "m";
  a["и"] = "i";
  a["т"] = "t";
  a["ь"] = "'";
  a["б"] = "b";
  a["ю"] = "yu";

  for (var i in word) {
    if (word.hasOwnProperty(i)) {
      if (a[word[i]] === undefined) {
        answer += word[i];
      } else {
        answer += a[word[i]];
      }
    }
  }
  return answer;
};

const languages = [
  ["Auto-detect", "auto"],
  ["Afar", "aa"],
  ["Abkhazian", "ab"],
  ["Avestan", "ae"],
  ["Afrikaans", "af"],
  ["Akan", "ak"],
  ["Amharic", "am"],
  ["Aragonese", "an"],
  ["Arabic", "ar", "rtl"],
  ["Assamese", "as"],
  ["Avaric", "av"],
  ["Aymara", "ay"],
  ["Azerbaijani", "az"],
  ["Bashkir", "ba"],
  ["Belarusian", "be"],
  ["Bulgarian", "bg"],
  ["Bihari languages", "bh"],
  ["Bislama", "bi"],
  ["Bambara", "bm"],
  ["Bengali", "bn"],
  ["Tibetan", "bo"],
  ["Breton", "br"],
  ["Bosnian", "bs"],
  ["Catalan", "ca"],
  ["Chechen", "ce"],
  ["Chamorro", "ch"],
  ["Corsican", "co"],
  ["Cree", "cr"],
  ["Czech", "cs"],
  ["Church Slavic", "cu"],
  ["Chuvash", "cv"],
  ["Welsh", "cy"],
  ["Danish", "da"],
  ["German", "de"],
  ["Maldivian", "dv", "rtl"],
  ["Dzongkha", "dz"],
  ["Ewe", "ee"],
  ["Greek, Modern (1453-)", "el"],
  ["English", "en"],
  ["Esperanto", "eo"],
  ["Spanish", "es"],
  ["Estonian", "et"],
  ["Basque", "eu"],
  ["Persian", "fa", "rtl"],
  ["Fulah", "ff"],
  ["Finnish", "fi"],
  ["Fijian", "fj"],
  ["Faroese", "fo"],
  ["French", "fr"],
  ["Western Frisian", "fy"],
  ["Irish", "ga"],
  ["Gaelic", "gd"],
  ["Galician", "gl"],
  ["Guarani", "gn"],
  ["Gujarati", "gu"],
  ["Manx", "gv"],
  ["Hausa", "ha"],
  ["Hebrew", "he", "rtl"],
  ["Hindi", "hi"],
  ["Hiri Motu", "ho"],
  ["Croatian", "hr"],
  ["Haitian", "ht"],
  ["Hungarian", "hu"],
  ["Armenian", "hy"],
  ["Herero", "hz"],
  ["Interlingua", "ia"],
  ["Indonesian", "id"],
  ["Interlingue", "ie"],
  ["Igbo", "ig"],
  ["Sichuan Yi", "ii"],
  ["Inupiaq", "ik"],
  ["Ido", "io"],
  ["Icelandic", "is"],
  ["Italian", "it"],
  ["Inuktitut", "iu"],
  ["Japanese", "ja"],
  ["Javanese", "jv"],
  ["Georgian", "ka"],
  ["Kongo", "kg"],
  ["Kikuyu", "ki"],
  ["Kuanyama", "kj"],
  ["Kazakh", "kk"],
  ["Kalaallisut", "kl"],
  ["Central Khmer", "km"],
  ["Kannada", "kn"],
  ["Korean", "ko"],
  ["Kanuri", "kr"],
  ["Kashmiri", "ks"],
  ["Kurdish", "ku", "rtl"],
  ["Komi", "kv"],
  ["Cornish", "kw"],
  ["Kirghiz", "ky"],
  ["Latin", "la"],
  ["Luxembourgish", "lb"],
  ["Ganda", "lg"],
  ["Limburgan", "li"],
  ["Lingala", "ln"],
  ["Lao", "lo"],
  ["Lithuanian", "lt"],
  ["Luba-Katanga", "lu"],
  ["Latvian", "lv"],
  ["Malagasy", "mg"],
  ["Marshallese", "mh"],
  ["Maori", "mi"],
  ["Macedonian", "mk"],
  ["Malayalam", "ml"],
  ["Mongolian", "mn"],
  ["Marathi", "mr"],
  ["Malay", "ms"],
  ["Maltese", "mt"],
  ["Burmese", "my"],
  ["Nauru", "na"],
  ["Norwegian Bokmål", "nb"],
  ["Ndebele, North", "nd"],
  ["Nepali", "ne"],
  ["Ndonga", "ng"],
  ["Dutch", "nl"],
  ["Norwegian Nynorsk", "nn"],
  ["Norwegian", "no"],
  ["Ndebele, South", "nr"],
  ["Navajo", "nv"],
  ["Chichewa", "ny"],
  ["Occitan (post 1500)", "oc"],
  ["Ojibwa", "oj"],
  ["Oromo", "om"],
  ["Oriya", "or"],
  ["Ossetian", "os"],
  ["Panjabi", "pa"],
  ["Pali", "pi"],
  ["Polish", "pl"],
  ["Pushto", "ps"],
  ["Portuguese", "pt"],
  ["Quechua", "qu"],
  ["Romansh", "rm"],
  ["Rundi", "rn"],
  ["Romanian", "ro"],
  ["Russian", "ru"],
  ["Kinyarwanda", "rw"],
  ["Sanskrit", "sa"],
  ["Sardinian", "sc"],
  ["Sindhi", "sd"],
  ["Northern Sami", "se"],
  ["Sango", "sg"],
  ["Sinhala", "si"],
  ["Slovak", "sk"],
  ["Slovenian", "sl"],
  ["Samoan", "sm"],
  ["Shona", "sn"],
  ["Somali", "so"],
  ["Albanian", "sq"],
  ["Serbian", "sr"],
  ["Swati", "ss"],
  ["Sotho, Southern", "st"],
  ["Sundanese", "su"],
  ["Swedish", "sv"],
  ["Swahili", "sw"],
  ["Tamil", "ta"],
  ["Telugu", "te"],
  ["Tajik", "tg"],
  ["Thai", "th"],
  ["Tigrinya", "ti"],
  ["Turkmen", "tk"],
  ["Tagalog", "tl"],
  ["Tswana", "tn"],
  ["Tonga (Tonga Islands)", "to"],
  ["Turkish", "tr"],
  ["Tsonga", "ts"],
  ["Tatar", "tt"],
  ["Twi", "tw"],
  ["Tahitian", "ty"],
  ["Uighur", "ug"],
  ["Ukrainian", "uk"],
  ["Urdu", "ur", "rtl"],
  ["Uzbek", "uz"],
  ["Venda", "ve"],
  ["Vietnamese", "vi"],
  ["Volapük", "vo"],
  ["Walloon", "wa"],
  ["Wolof", "wo"],
  ["Xhosa", "xh"],
  ["Yiddish", "yi"],
  ["Yoruba", "yo"],
  ["Zhuang", "za"],
  ["Chinese", "zh"],
  ["Zulu", "zu"],
];

export default function App() {
  const [value, onChangeText] = React.useState("");
  const [inputLanguage, onInputLanguage] = React.useState(languages[0]);
  const [outputLanguage, onOutputLanguage] = React.useState(languages[38]);
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [search, onSearchTextChange] = React.useState("");
  const [error, setError] = React.useState(false);
  const [detected, setDetected] = React.useState(false);
  const inputTextArea = React.useRef(null);
  const [savedTranslations, setSavedTranslations] = React.useState([]);
  const [rtlText, setRTLText] = React.useState({});
  const [rtlView, setRTLView] = React.useState({});

  const speak = (text, language) => {
    Speech.speak(text, {
      language: language,
      pitch: 1,
      rate: 0.75,
    });
  };

  const onShare = async (text) => {
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const pasteFromClipBoard = async () => {
    const copiedText = await Clipboard.getStringAsync();

    inputTextArea.current.value = copiedText;
    inputTextArea.current.focus();

    onChangeText(copiedText);
  };

  const switchLanguages = () => {
    if (inputLanguage[1] != "auto") {
      const input = inputLanguage;
      const output = outputLanguage;
      const inputValue = value;
      const outputArray = data;

      onChangeText(outputArray.output.replaceAll("(*n*)", "\n"));
      setData(outputArray);
      setDetected(false);

      outputArray.output = inputValue;

      onInputLanguage(output);
      onOutputLanguage(input);
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      Alert.alert("Error while saving translation.");
    }
  };

  const removeStoreData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Alert.alert("Error while removing translation.");
    }
  };

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) =>
      AsyncStorage.multiGet(keys).then((data) => {
        var jsonData = [];

        data.map((item) => {
          jsonData.push([item[0], JSON.parse(item[1])]);
        });

        setSavedTranslations(jsonData);

        return savedTranslations;
      })
    );
  }, []);

  React.useEffect(() => {
    setLoading(true);

    I18nManager.forceRTL(false);
    I18nManager.allowRTL(true);

    const rtlText =
      inputLanguage.length == 3 ||
      (outputLanguage.length == 3 && {
        textAlign: "right",
        writingDirection: "rtl",
      });
    const rtlView =
      inputLanguage.length == 3 ||
      (outputLanguage.length == 3 && { flexDirection: "row-reverse" });

    setRTLText(rtlText);
    setRTLView(rtlView);

    const delayDebounceFn = setTimeout(() => {
      if (value.trim().length > 0) {
        const url =
          "https://unlimited-google-translate.p.rapidapi.com/translate";
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "6d1494b3d2mshbb2fba71701790fp13786bjsnbb8040cf3745",
            "X-RapidAPI-Host": "unlimited-google-translate.p.rapidapi.com",
          },
          body: `{"lang":"${inputLanguage[1]}","dest":"${
            outputLanguage[1]
          }","text":"${value.replaceAll("\n", "(*n*)")}"}`,
        };
        fetch(url, options)
          .then((res) => res.json())
          .then((json) => {
            setData(json);

            if (inputLanguage[1] === "auto" && json) {
              const detectedLanguage = json?.input?.source_lang;
              const languageInList = languages.filter((language) =>
                new RegExp(language[1]).test(detectedLanguage)
              );

              setDetected(true);
              languageInList && onInputLanguage(languageInList[0]);
            }
          })
          .finally(() => setLoading(false))
          .catch((err) => setError({ message: err }));
      }
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [value, inputLanguage, outputLanguage]);

  return (
    <View
      style={[styles.container, { backgroundColor: "white" }, rtlView, rtlText]}
      onPress={() => setModalVisible(false)}
    >
      <View style={{ backgroundColor: "#f3f3f3", height: "100%" }}>
        <Appbar.Header style={[styles.header, { elevation: 0, fontSize: 16 }]}>
          <Appbar.Action
            icon="github"
            onPress={() =>
              WebBrowser.openBrowserAsync("https://github.com/leroywagner")
            }
          />
          <Appbar.Content
            titleStyle={[styles.headerText]}
            title="Snaper Translate"
          />
          <Appbar.Action
            icon="help-circle-outline"
            onPress={() =>
              WebBrowser.openBrowserAsync(
                "https://github.com/leroywagner/react-native-translator/issues"
              )
            }
          />
        </Appbar.Header>
        <ScrollView style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={[styles.modalView, { flex: 1 }]}>
              <View style={[styles.flexOptionsBlockSpace, { padding: 15 }]}>
                <Text style={styles.modalTitle}>Translate from:</Text>
                <TouchableOpacity
                  style={[styles.replaceButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.flexOptionsBlockSpace,
                  styles.flexFullWidth,
                  { padding: 10, justifyContent: "flex-start" },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#374CF4"
                  style={{ padding: 5 }}
                />
                <View style={styles.flexFullWidth}>
                  <TextInput
                    placeholder="Search..."
                    value={search}
                    onChangeText={(t) => onSearchTextChange(t)}
                    style={[styles.modalInput, { padding: 10 }]}
                  />
                </View>
              </View>
              <ScrollView style={{ height: "80%" }}>
                {languages
                  .filter((item) => new RegExp(search).test(item[0]))
                  .map((language) => {
                    return (
                      <TouchableOpacity
                        key={Math.random()}
                        onPress={() => {
                          setDetected(false);
                          onSearchTextChange("");
                          onInputLanguage(language);
                          setModalVisible(false);
                        }}
                        style={[
                          styles.flex,
                          { padding: 15, justifyContent: "flex-start" },
                        ]}
                      >
                        {inputLanguage[1] === language[1] ? (
                          <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color="#374CF4"
                          />
                        ) : (
                          <Ionicons
                            name="checkmark-outline"
                            size={20}
                            color="white"
                          />
                        )}
                        <Text style={styles.modalListItem}>{language[0]}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </Modal>
          {/* Dest language */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => setModalVisible2(!modalVisible)}
          >
            <View style={[styles.modalView, { flex: 1 }]}>
              <View style={[styles.flexOptionsBlockSpace, { padding: 15 }]}>
                <Text style={styles.modalTitle}>Translate to:</Text>
                <TouchableOpacity
                  style={[styles.replaceButton]}
                  onPress={() => setModalVisible2(false)}
                >
                  <Ionicons name="close-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.flexOptionsBlockSpace,
                  styles.flexFullWidth,
                  { padding: 10, justifyContent: "flex-start" },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#374CF4"
                  style={{ padding: 5 }}
                />
                <View style={styles.flexFullWidth}>
                  <TextInput
                    placeholder="Search..."
                    value={search}
                    onChangeText={(t) => onSearchTextChange(t)}
                    style={[styles.modalInput, { padding: 10 }]}
                  />
                </View>
              </View>
              <ScrollView style={{ height: "80%" }}>
                {languages
                  .filter((item) => new RegExp(search).test(item[0]))
                  .map((language) => {
                    return (
                      language[1] != "auto" && (
                        <TouchableOpacity
                          key={Math.random()}
                          onPress={() => {
                            setDetected(false);
                            onSearchTextChange("");
                            onOutputLanguage(language);
                            setModalVisible2(false);
                          }}
                          style={[
                            styles.flex,
                            { padding: 15, justifyContent: "flex-start" },
                          ]}
                        >
                          {outputLanguage[1] === language[1] ? (
                            <Ionicons
                              name="checkmark-outline"
                              size={20}
                              color="#374CF4"
                            />
                          ) : (
                            <Ionicons
                              name="checkmark-outline"
                              size={20}
                              color="white"
                            />
                          )}
                          <Text style={styles.modalListItem}>
                            {language[0]}
                          </Text>
                        </TouchableOpacity>
                      )
                    );
                  })}
              </ScrollView>
            </View>
          </Modal>

          <View style={styles.textArea}>
            <View style={styles.navTabs}>
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.languageButtonTitle}>
                  {detected ? `${inputLanguage[0]}` : inputLanguage[0]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => switchLanguages()}
                style={[
                  styles.replaceButton,
                  { borderRadius: 100 },
                  inputLanguage[1] != "auto" ? { opacity: 1 } : {},
                ]}
              >
                <Ionicons name="sync-outline" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.languageButton, { alignItems: "flex-end" }]}
                onPress={() => setModalVisible2(true)}
              >
                <Text style={[styles.languageButtonTitle, { marginRight: 5 }]}>
                  {outputLanguage[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.textAreaBlock, { flex: 1 }]}>
            <Text
              style={[
                styles.translatedTextLabelWhite,
                { color: "grey", opacity: 0.8 },
              ]}
            >
              {inputLanguage[0]}
            </Text>
            <TextInput
              ref={inputTextArea}
              multiline
              numberOfLines={4}
              onChangeText={(text) => {
                setLoading(true);
                onChangeText(text);
              }}
              value={value}
              style={[styles.textInput, rtlText, rtlView]}
              placeholder="Type to translate..."
            />
            <View
              style={[styles.translateBadge, { paddingBottom: 10, flex: 1 }]}
            >
              <View style={[styles.flexOptionsBlockSpace, rtlView]}>
                <View style={{ width: "80%" }}>
                  {transliterate(value).trim().length > 0 && (
                    <Text
                      style={[
                        styles.transliterateText,
                        {
                          paddingLeft: 0,
                          paddingBottom: 0,
                          marginBottom: 0,
                          marginTop: 0,
                          paddingTop: 0,
                        },
                        rtlText,
                      ]}
                    >
                      Pronunciation:{" "}
                      {transliterate(value.replaceAll("\n", " ↵ "))}
                    </Text>
                  )}
                </View>
                <View style={[styles.flexOptionsBlock]}>
                  {value.trim().length > 0 ? (
                    <View style={[styles.translateGroupRight]}>
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.speechButtonFilled,
                            { opacity: 1, marginRight: 15 },
                          ]}
                          onPress={() => speak(value, inputLanguage[1])}
                        >
                          <Ionicons
                            name="volume-high"
                            size={25}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.translateGroupRight}>
                      <View>
                        <TouchableOpacity
                          onPress={() => pasteFromClipBoard()}
                          style={[
                            styles.speechButtonFilled,
                            {
                              opacity: 1,
                              marginRight: 15,
                              backgroundColor: "#374CF4",
                            },
                          ]}
                        >
                          <Ionicons
                            name="copy-outline"
                            size={25}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          {error && (
            <View style={styles.errorBlock}>
              <Text>{error}</Text>
            </View>
          )}
          {!error && value != "" && (
            <View
              style={[styles.translatedBlock, { paddingRight: 20, flex: 1 }]}
            >
              <View style={[styles.translatedText]}>
                <View style={[styles.flexOptionsBlockSpace, rtlView, rtlText]}>
                  <Text style={styles.translatedTextLabelWhite}>
                    {outputLanguage[0]}
                  </Text>
                  {!loading && (
                    <TouchableOpacity
                      onPress={() => {
                        const options = {
                          input: {
                            language: inputLanguage,
                            text: value,
                          },
                          output: {
                            language: outputLanguage,
                            text: data.output.replaceAll("(*n*)", "\n"),
                          },
                        };
                        storeData(
                          new Date().getMilliseconds().toString(),
                          options
                        ).then(() => {
                          AsyncStorage.getAllKeys().then((keys) =>
                            AsyncStorage.multiGet(keys).then((data) => {
                              var jsonData = [];

                              data.map((item) => {
                                jsonData.push([item[0], JSON.parse(item[1])]);
                              });

                              setSavedTranslations(jsonData);
                              return savedTranslations;
                            })
                          );
                        });
                      }}
                      style={[styles.starButton]}
                    >
                      <Ionicons name="cloud-upload" size={25} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text
                  style={[
                    styles.translatedTextLabel,
                    { fontWeight: "500" },
                    rtlView,
                    rtlText,
                  ]}
                >
                  {loading
                    ? "Translation..."
                    : data && data.output.replaceAll("(*n*)", "\n")}
                </Text>
                {!loading && transliterate(value).trim().length > 0 && (
                  <Text
                    style={[
                      styles.transliterateText,
                      rtlView,
                      rtlText,
                      {
                        margin: 0,
                        color: "white",
                        opacity: 0.6,
                        paddingTop: 0,
                      },
                    ]}
                  >
                    Pronunciation:{" "}
                    {transliterate(data.output.replaceAll("(*n*)", " ↵ "))}
                  </Text>
                )}
              </View>
              {!loading && (
                <View style={[styles.flexOptionsBlock, rtlView, rtlText]}>
                  <View style={[styles.translateGroupRight]}>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(
                          data.output.replaceAll("(*n*)", "\n")
                        ).then(() => Alert.alert("Copied to clipboard."))
                      }
                      style={[
                        styles.speechButton,
                        { paddingLeft: 11, paddingRight: 11 },
                      ]}
                    >
                      <Ionicons name="copy" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.translateGroupRight}>
                    <TouchableOpacity
                      onPress={() =>
                        onShare(data.output.replaceAll("(*n*)", "\n"))
                      }
                      style={[
                        styles.speechButton,
                        { paddingLeft: 11, paddingRight: 11 },
                      ]}
                    >
                      <Ionicons name="share-social" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.translateGroupRight]}>
                    <TouchableOpacity
                      style={[styles.speechButton]}
                      onPress={() =>
                        speak(
                          data.output.replaceAll("(*n*)", "\n"),
                          outputLanguage[1]
                        )
                      }
                    >
                      <Ionicons name="volume-high" size={25} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
          {savedTranslations.length > 0 && (
            <View style={{ marginBottom: 50 }}>
              <Text style={styles.savedTranslationsLabel}>
                Saved translation:
              </Text>
              {savedTranslations.reverse().map((item) => {
                return (
                  <View key={item[0]} style={styles.savedTranslations}>
                    <View style={[styles.flexOptionsBlock]}>
                      <View style={{ alignSelf: "center" }}>
                        <Text
                          style={[
                            styles.savedTranslationsText,
                            {
                              fontSize: 14,
                              marginBottom: 10,
                              fontWeight: "500",
                            },
                          ]}
                        >
                          {item[1].input.language[0]} →{" "}
                          {item[1].output.language[0]}
                        </Text>
                        <Text
                          style={[
                            { paddingLeft: 0, fontWeight: "500", fontSize: 16 },
                          ]}
                        >
                          {item[1].input.text}
                        </Text>
                        <View>
                          <Text
                            style={[
                              styles.savedTranslationsText,
                              { fontSize: 14 },
                            ]}
                          >
                            {item[1].output.text}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.flexOptionsBlock,
                          { alignItems: "stretch" },
                        ]}
                      >
                        <View style={styles.translateGroupRight}>
                          <TouchableOpacity
                            style={[
                              styles.speechButtonFilled,
                              {
                                opacity: 1,
                                marginRight: 15,
                                backgroundColor: "#f3f3f3",
                              },
                            ]}
                            onPress={() =>
                              removeStoreData(item[0]).then(() => {
                                AsyncStorage.getAllKeys().then((keys) =>
                                  AsyncStorage.multiGet(keys).then((data) => {
                                    var jsonData = [];

                                    data.map((item) => {
                                      jsonData.push([
                                        item[0],
                                        JSON.parse(item[1]),
                                      ]);
                                    });

                                    setSavedTranslations(jsonData);
                                    return savedTranslations;
                                  })
                                );
                              })
                            }
                          >
                            <Ionicons
                              name="cloud-offline-outline"
                              size={20}
                              color="grey"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    height: "100%",
  },
  textInput: {
    padding: 5,
    height: 100,
    paddingTop: 20,
    borderRadius: 10,
    margin: 10,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 0,
    paddingTop: 5,
  },
  navTabs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingTop: 20,
  },
  replaceButton: {
    padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 20,
    backgroundColor: "#374CF4",
  },
  languageButton: {
    padding: 10,
    width: "45%",
  },
  languageButtonTitle: {
    fontSize: 18,
    color: "#374CF4",
    fontWeight: "700",
  },
  speechButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    margin: 10,
    borderRadius: 100,
    paddingLeft: 9,
    paddingRight: 9,
    marginLeft: 5,
  },
  speechButtonFilled: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    margin: 10,
    borderRadius: 100,
    paddingLeft: 9,
    paddingRight: 9,
    marginLeft: 5,
    backgroundColor: "#374CF4",
    opacity: 0.5,
  },
  flexOptionsBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  translatedText: {
    margin: 10,
    padding: 10,
    color: "white",
    borderRadius: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  translatedTextLabel: {
    padding: 10,
    color: "white",
    fontSize: 18,
    opacity: 0.8,
  },
  translatedTextLabelWhite: {
    padding: 10,
    color: "white",
    fontSize: 13,
    opacity: 0.6,
  },
  errorBlock: {
    backgroundColor: "red",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: 20,
    elevation: 2,
  },
  translatedBlock: {
    backgroundColor: "#374CF4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: -20,
    padding: 5,
    paddingRight: 15,
    borderTopWidth: 10,
    borderTopColor: "white",
  },
  flexOptionsBlockSpace: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starButton: {
    marginRight: 10,
  },
  modalView: {
    margin: 0,
    marginTop: 75,
    backgroundColor: "white",
    borderRadius: 20,
    height: "90%",
    shadowColor: "#635d63",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
  },
  modalListItem: {
    padding: 10,
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 15,
  },
  textAreaBlock: {
    backgroundColor: "white",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 0,
    borderTopWidth: 0,
    padding: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 2,
  },
  transliterateText: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    color: "grey",
    fontSize: 15,
    marginBottom: 0,
    paddingBottom: 0,
    fontWeight: "500",
  },
  modalInput: {
    borderRadius: 100,
    marginRight: 35,
    fontSize: 18,
    fontWeight: "500",
  },
  flexFullWidth: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  savedTranslations: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 15,
    padding: 15,
    paddingRight: 0,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 2,
  },
  savedTranslationsText: {
    color: "grey",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  savedTranslationsLabel: {
    padding: 20,
    paddingBottom: 0,
    fontWeight: "500",
    fontSize: 16,
  },
});
