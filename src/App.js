import React, { useState } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppMenu from './AppMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppInlineProfile from './AppInlineProfile';

import { Dashboard } from './components/Dashboard';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';
import { ButtonDemo } from './components/ButtonDemo';
import { TableDemo } from './components/TableDemo';
import { ListDemo } from './components/ListDemo';
import { TreeDemo } from './components/TreeDemo';
import { PanelDemo } from './components/PanelDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { MediaDemo } from './components/MediaDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { FileDemo } from './components/FileDemo';
import { ChartDemo } from './components/ChartDemo';
import { MiscDemo } from './components/MiscDemo';
import { Documentation } from './components/Documentation';
import { IconsDemo } from './utilities/IconsDemo';
import { Widgets } from './utilities/Widgets';
import { GridDemo } from './utilities/GridDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { DisplayDemo } from './utilities/DisplayDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { CrudDemo } from './pages/CrudDemo';
import { CalendarDemo } from './pages/CalendarDemo';
import { TimelineDemo } from './pages/TimelineDemo';
import { Invoice } from './pages/Invoice';
import { Help } from './pages/Help';
import { EmptyPage } from './pages/EmptyPage';

import IC4Pro_Operations from "./iC4Pro_operations/IC4Pro_Operations";
import ic4prolanguage from './Adroit_iC4Pro_language/iC4Pro_Language';
import ic4procountry from './Adroit_iC4Pro_country/iC4Pro_Country';
import ic4procurrency from './Adroit_iC4Pro_currency2/iC4Pro_Currency';
import ic4proregulators from './Adroit_iC4Pro_regulators/iC4Pro_Regulator';
import ic4prosanctions from './Adroit_iC4Pro_sanctions/iC4Pro_Sanction';
import ic4procallover from './Adroit_iC4Pro_callover/IC4Pro_Callover';
import IC4Pro_BSMCallover from './iC4Pro_BSMCalloverStepTwo/IC4Pro_BSMCallover';
import IC4Pro_NextBSM from  './iC4Pro_NextBSM/IC4Pro_NextBSM'
import IC4Pro_LastBSM from  './iC4Pro_LastBSM/IC4Pro_LastBSM'

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {

    const [menuActive, setMenuActive] = useState(false);
    const [menuMode] = useState('static');
    const [darkMenu, setDarkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode, setProfileMode] = useState('popup');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);

    const history = useHistory();

    let menuClick = false;
    let configClick = false;
    let topbarItemClick = false;
    let inlineMenuClick = false;

    const menu = [

        {
            label: 'iCONCEPT4PRO HUBS', icon: 'pi pi-home',
            items: [
                {
                    label: "iConcept4Pro Core",
                    icon: "pi pi-folder",
                    items: [
                        {
                            label: "User Profile",
                            icon: 'pi pi-caret-down',
                            items: [
                                { label: "Dashboard 1", icon: "pi pi-circle-on", to: "/" },
                                { label: "Dashboard 2", icon: 'pi pi-circle-on', to: "/" },

                            ],
                        },
                        {
                            label: "General Settings",
                            icon: "pi pi-caret-down",
                            items: [
                                { label: "Catalog Types", icon: "pi pi-circle-on", to: "/Ic4pro_catalogtypes" },
                                { label: "Catalog", icon: "pi pi-circle-on", to: "/Ic4pro_catalog" },
                                { label: "Departments", icon: "pi pi-circle-on", to: "/IC4Pro_departments" },
                                { label: "Notifier", icon: "pi pi-circle-on", to: "/IC4Pro_notifiers" },
                            ],
                        },
                    ],
                },
                {
                    label: "Internal Control Hub",
                    icon: "pi pi-folder",
                    items: [
                        {
                            label: "Dashboards",
                            icon: "pi pi-caret-down",
                            items: [
                                { label: "Dashboard 1", icon: "pi pi-circle-on", to: "/" },
                                { label: "Dashboard 2", icon: "pi pi-circle-on" },
                                { label: "Dashboard 3", icon: "pi pi-circle-on" },
                                { label: "Dashboard 4", icon: "pi pi-circle-on" },
                            ],
                        },
                        {
                            label: "General Settings",
                            icon: "pi pi-caret-down",
                            items: [
                                { label: "Catalog Types", icon: "pi pi-circle-on", to: "/Ic4pro_catalogtypes" },
                                { label: "Catalog", icon: "pi pi-circle-on", to: "/Ic4pro_catalog" },
                                { label: "Departments", icon: "pi pi-circle-on", to: "/IC4Pro_departments" },
                                { label: "Notifier", icon: "pi pi-circle-on", to: "/IC4Pro_notifiers" },
                            ],
                        },
                        {
                            label: "Exception Managers",
                            icon: "pi pi-caret-down",
                            items: [
                                { label: "Submenu 1.2.1", icon: "pi pi-circle-on" },
                                { label: "Submenu 1.2.2", icon: "pi pi-circle-on" },
                            ],
                        },
                        {
                            label: "Anomaly Detection",
                            icon: "pi pi-caret-down",
                            items: [
                                { label: "Submenu 1.3.1", icon: "pi pi-circle-on" },
                                { label: "Submenu 1.3.2", icon: "pi pi-circle-on" },
                            ],
                        },
                        {
                            label: "Reports",
                            icon: "pi pi-angle-double-down",
                            items: [
                                {
                                    label: "BSM Reports",
                                    icon: "pi pi-circle-on",
                                    items: [
                                        { label: "Customer Above 550T", icon: "pi pi-circle-on" },
                                        { label: "Accounts Reactived", icon: "pi pi-circle-on" },
                                    ],
                                },
                                { label: "Other Reports", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                    ],
                },
                {
                    label: "Call-over Hub",
                    icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "BSM",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-align-left" },
                                { label: "Call-Over", icon: "pi pi-circle-on", to: "/ic4procallover" },
                            ],
                        },
                        {
                            label: "Tellers & Operation",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                    ],
                },
                {
                    label: "Compliance (RADAR) Hub",
                    icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "General Settings",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Phone Codes", icon: "pi pi-fw pi-id-card", to: "/IC4Pro_phone_codes" },
                                { label: "Phone Carrier", icon: "pi pi-fw pi-id-card", to: "/Ic4pro_phoneCarriers" },
                            ],
                        },
                        {
                            label: "Customer Risk Ratings",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "Customer On-boarding",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                    ],
                },
                {
                    label: "Audit & Inspections Hub",
                    icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "Dashboard",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "General Settings",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Risk Frequency", icon: "pi pi-fw pi-id-card", to: "/IC4Pro_riskFrequency" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "Reports",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                    ],
                },
                {
                    label: "IT Audit Hub",
                    icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "Dashboard",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "General Settings",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-align-left" },
                            ],
                        },


                        {
                            label: "Operating Systems",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.1.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.2", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.1.3", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "Databases",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },
                        {
                            label: "Networks & Routers",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Submenu 2.2.1", icon: "pi pi-fw pi-align-left" },
                                { label: "Submenu 2.2.2", icon: "pi pi-fw pi-align-left" },
                            ],
                        },


                    ],
                },


                {
                    label: "Development Hub",
                    icon: "pi pi-fw pi-align-left",
                    items: [
                        {
                            label: "Assessment",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Assessment Overdue", icon: "pi pi-fw pi-id-card", to: "/IC4Pro_assessmentOverdue" },
                                { label: "Assessment Remark", icon: "pi pi-fw pi-align-left", to: "/IC4Pro_assessmentRemark" },
                                //    { label: "fains", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_fains" },
                                //    { label: "faint", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_faint" },
                                //    { label: "faint2", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_faint2" },

                            ],
                        },
                        {
                            label: "Audit",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                //   { label: "Audit Coverage", icon: "pi pi-fw pi-align-left", to:"/IC4Pro_auditCoverage" },
                                //   { label: "Audit Objectives", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_auditObjectives" },
                                //   { label: "Check lists", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_checklists" },
                                //   { label: "Task Auditees", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_taskAuditees" },
                                //   { label: "TaskAuditors", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_taskAuditors" },
                            ],
                        },


                        {
                            label: "Control",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                { label: "Language", icon: "pi pi-fw pi-align-left", to: "/ic4prolanguage" },
                                { label: "Country", icon: "pi pi-fw pi-align-left", to: "/ic4procountry" },
                                { label: "Currency", icon: "pi pi-fw pi-align-left", to: "/ic4procurrency" },
                                { label: "Regulators", icon: "pi pi-fw pi-align-left", to: "/ic4proregulators" },
                                { label: "Sanctions", icon: "pi pi-fw pi-align-left", to: "/ic4prosanctions" },
                                //   { label: "Control Class", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_controlClass" },
                                //   { label: "Inspection Type", icon: "pi pi-fw pi-align-left", to:"/IC4Pro_inspectionType"},
                                //   { label: "Likelihoods", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_likelihoods" },
                                //   { label: "Concat", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_concat001" },
                                //   { label: "Classes", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_classes" },
                            ],
                        },
                        {
                            label: "Messages",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                //   { label: "Messages", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_messages"},
                                //   { label: "Message Types", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_messageTypes" },
                                //   { label: "More Menus", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_moreMenus"},
                                { label: "Operations", icon: "pi pi-fw pi-align-left", to: "/IC4Pro_Operations" },
                                //   { label: "Percentile", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_percentile"},
                                //   { label: "Reasons", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_reasons" },

                            ],
                        },
                        {
                            label: "Risk",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                //   { label: "Riskassessment", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_riskassessment"},
                                //   { label: "RiskClasses", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_riskClasses" },
                                //   { label: "RiskRules", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_riskRules"},
                                //   { label: "RiskTypes", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_riskTypes" },
                                //   { label: "Severitys", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_severitys"},
                                //   { label: "Exceptionlists", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_exceptionlists" },
                            ],
                        },

                        {
                            label: "Inspector",
                            icon: "pi pi-fw pi-align-left",
                            items: [
                                //    { label: "InspectorRoles", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_inspectorRoles"},
                                //    { label: "InspectRoles", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_inspectRoles" },
                                //    { label: "FieldsMapper", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_fieldsMapper"},
                                //    { label: "Status", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_Status" },
                                //    { label: "StatusColor", icon: "pi pi-fw pi-align-left",to:"/IC4Pro_StatusColor"},
                            ],
                        },


                    ],
                },

            ],
        },

    ];


    const routers = [
        { path: "/", component: Dashboard, exact: true, meta: { breadcrumb: [{ parent: "Dashboard", label: "Dashboard" }] } },
        { path: "/formlayout", component: FormLayoutDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Form Layout" }] } },
        // IC4Pro_BSMCa
        { path: "/IC4Pro_Operations", component: IC4Pro_Operations, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Operations" }] } },
        { path: "/ic4prolanguage", component: ic4prolanguage, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Language" }] } },
        { path: "/ic4procountry", component: ic4procountry, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Country" }] } },
        { path: "/ic4procurrency", component: ic4procurrency, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Currency" }] } },
        { path: "/ic4procurrency2", component: ic4procurrency, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Currency" }] } },
        { path: "/ic4proregulators", component: ic4proregulators, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Regulators" }] } },
        { path: "/ic4prosanctions", component: ic4prosanctions, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Sanctions" }] } },
        { path: "/ic4procallover", component: ic4procallover, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Call-Over" }] } },
        { path: "/ic4probsmcallover", component: IC4Pro_BSMCallover, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "BSM-Call-Over" }] } },
        { path: "/ic4probsmcallover3", component: IC4Pro_NextBSM, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "BSM-Call-Over" }] } },
        { path: "/ic4probsmcallover4", component: IC4Pro_LastBSM, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "BSM-Call-Over" }] } },
        { path: "/input", component: InputDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Input" }] } },
        { path: "/floatlabel", component: FloatLabelDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Float Label" }] } },
        { path: "/invalidstate", component: InvalidStateDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Invalid State" }] } },
        { path: "/button", component: ButtonDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Button" }] } },
        { path: "/table", component: TableDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Table" }] } },
        { path: "/list", component: ListDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "List" }] } },
        { path: "/tree", component: TreeDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Tree" }] } },
        { path: "/panel", component: PanelDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Panel" }] } },

        { path: "/overlay", component: OverlayDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Overlay" }] } },
        { path: "/media", component: MediaDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Media" }] } },
        { path: "/menu", component: MenuDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Menu" }] } },
        { path: "/messages", component: MessagesDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Messages" }] } },
        { path: "/file", component: FileDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "File" }] } },
        { path: "/chart", component: ChartDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Charts" }] } },
        { path: "/misc", component: MiscDemo, meta: { breadcrumb: [{ parent: "iConcept4Pro Hubs", label: "Misc" }] } },
        { path: "/icons", component: IconsDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Icons" }] } },
        { path: "/widgets", component: Widgets, meta: { breadcrumb: [{ parent: "Utilities", label: "Widgets" }] } },
        { path: "/grid", component: GridDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Grid System" }] } },
        { path: "/spacing", component: SpacingDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Spacing" }] } },
        { path: "/elevation", component: ElevationDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Elevation" }] } },
        { path: "/typography", component: TypographyDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Typography" }] } },
        { path: "/display", component: DisplayDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Display" }] } },
        { path: "/flexbox", component: FlexBoxDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Flexbox" }] } },
        { path: "/text", component: TextDemo, meta: { breadcrumb: [{ parent: "Utilities", label: "Text" }] } },
        { path: "/crud", component: CrudDemo, meta: { breadcrumb: [{ parent: "Pages", label: "Crud" }] } },
        { path: "/calendar", component: CalendarDemo, meta: { breadcrumb: [{ parent: "Pages", label: "Calendar" }] } },
        { path: "/timeline", component: TimelineDemo, meta: { breadcrumb: [{ parent: "Pages", label: "Timeline" }] } },
        { path: "/invoice", component: Invoice, meta: { breadcrumb: [{ parent: "Pages", label: "Invoice" }] } },
        { path: "/help", component: Help, meta: { breadcrumb: [{ parent: "Pages", label: "Help" }] } },
        { path: "/empty", component: EmptyPage, meta: { breadcrumb: [{ parent: "Pages", label: "Empty Page" }] } },
        { path: "/documentation", component: Documentation, meta: { breadcrumb: [{ parent: "Pages", label: "Documentation" }] } },
    ];

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuColorChange = (e) => {
        setDarkMenu(e.value);
    };

    const onProfileChange = (e) => {
        setProfileMode(e.value);
    };

    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
            setInlineMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        inlineMenuClick = false;
        configClick = false;
        topbarItemClick = false;
        menuClick = false;
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const onMenuClick = () => {
        menuClick = true;

        if (inlineMenuActive && !inlineMenuClick) {
            setInlineMenuActive(false);
        }
    };

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (menuMode === 'static')
                return !staticMenuDesktopInactive;
            else if (menuMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        } else {
            return true;
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (isOverlay() && !isMobile()) {
            setOverlayMenuActive(prevOverlayMenuActive => !prevOverlayMenuActive);
        }
        else {
            if (isDesktop()) {
                setStaticMenuDesktopInactive(prevStaticMenuDesktopInactive => !prevStaticMenuDesktopInactive);
            }
            else {
                setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
            }
        }

        event.preventDefault();
    };

    const onProfileButtonClick = (event) => {
        setInlineMenuActive(prevInlineMenuActive => !prevInlineMenuActive);
        inlineMenuClick = true;

        if (isSlim() || isHorizontal()) {
            setMenuActive(false);
        }
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(prevTopbarMenuActive => !prevTopbarMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarItemClick = (event, item) => {
        topbarItemClick = true;

        if (activeTopbarItem === item) {
            setActiveTopbarItem(null);
        }
        else {
            setActiveTopbarItem(item);
        }

        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 896;
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isStatic = () => {
        return menuMode === 'static';
    };

    const hasInlineProfile = profileMode === 'inline' && !isHorizontal();

    const containerClassName = classNames('layout-wrapper',
        {
            'layout-static': isStatic(),
            'layout-overlay': isOverlay(),
            'layout-overlay-active': overlayMenuActive,
            'layout-horizontal': isHorizontal(),
            'layout-slim': isSlim(),
            'layout-static-inactive': staticMenuDesktopInactive,
            'layout-mobile-active': staticMenuMobileActive,
            'layout-menu-dark': darkMenu,
            'layout-menu-light': !darkMenu,
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() });

    return (
        <div className={containerClassName} onClick={onDocumentClick}>
            <AppTopbar topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem} onMenuButtonClick={onMenuButtonClick} onTopbarMenuButtonClick={onTopbarMenuButtonClick} onTopbarItemClick={onTopbarItemClick}
                isHorizontal={isHorizontal()} profileMode={profileMode} isMobile={isMobile}

                configActive={configActive} menuMode={menuMode}
                isDarkMenu={darkMenu} onMenuColorChange={onMenuColorChange}
                onProfileChange={onProfileChange} onConfigClick={onConfigClick} onConfigButtonClick={onConfigButtonClick}
                rippleActive={ripple} onRippleChange={onRippleChange} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} />

            <div className={menuContainerClassName} onClick={onMenuClick}>
                <div className="layout-menu-logo">
                    <button className="p-link" onClick={() => history.push('/')}>
                        <img id="layout-menu-logo" src="assets/layout/images/logo-white.png" library="iConcept4-layout" alt="iConcept4-logo" />
                    </button>
                </div>
                <div className="layout-menu-wrapper">
                    <div className="menu-scroll-content">
                        {hasInlineProfile && <AppInlineProfile inlineMenuActive={inlineMenuActive} onProfileButtonClick={onProfileButtonClick} />}
                        <AppMenu model={menu} menuMode={menuMode} active={menuActive} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick} />
                    </div>
                </div>
            </div>

            <div className="layout-main">
                <AppBreadcrumb routers={routers} />

                <div className="layout-content" style={{ background: '#00000021' }}>
                    {
                        routers.map((router, index) => {
                            if (router.exact) {
                                return <Route key={`router${index}`} path={router.path} exact component={router.component} />
                            }

                            return <Route key={`router${index}`} path={router.path} component={router.component} />
                        })
                    }
                </div>

                <AppFooter />
            </div>


            { staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
}

export default App;
