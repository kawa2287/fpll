import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TocIcon from '@mui/icons-material/Toc';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const linkList = [
    { title: 'Standings', icon: <TocIcon />, path: '/' },
    { title: 'Matchups', icon: <GroupIcon />, path: '/matchups' },
    { title: 'Insights', icon: <EmojiObjectsIcon />, path: '/insights' },
    { title: 'Fixtures', icon: <SportsSoccerIcon />, path: '/fixtures' },
    { title: 'Leaderboards', icon: <EmojiEventsIcon />, path: '/leaderboards' },
];
