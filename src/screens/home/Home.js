import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import genres from '../../common/genres';
import artists from '../../common/artists';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import $ from 'jquery'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  upcomingMoviesHeading: {
    textAlign: 'center',
    background: '#ff9999',
    padding: '8px',
    fontSize: '1rem'
  },
  gridListUpcomingMovies: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    width: '100%'
  },
  gridListMain: {

    transform: 'translateZ(0)',
    cursor: 'pointer'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth:240
  },
  title: {
    color: theme.palette.primary.light,
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movieName: "",
      genres: [],
      artists: []
    }

  }

  componentWillMount()
  { //let that = this;
    // let header = new Headers({
    // 'Access-Control-Allow-Origin':'*',
    // 'Content-Type': 'multipart/form-data'
    // });
    // fetch('http://2ea8ff3e.ngrok.io/api/v1/movies?page=1&limit=10', {
    //             method: 'get'
    //
    //           }).then( data => {
    //             console.log('data response ' + data);
    //             return data;
    //         }).then( response => {
    //             console.log(response);
    // });

     let settings = {
          "async": true,
          "url": "http://0b425de3.ngrok.io/api/v1/movies?page=1&limit=10",
          "method": "GET",
          "contentType": "application/json; charset=utf-8",
          "crossDomain": true,
          "headers": {
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin":"*"
          }
      }

      $.ajax(settings).done(function (response) {
      console.log("Movie Response", response.movies);
      });
  }
  movieNameChangeHandler = event => {
    this.setState({ movieName: event.target.value });

  }

  genreSelectHandler = event => {
    this.setState({ genres: event.target.value });
  }

  artistsSelectHandler = event => {
    this.setState({ artists: event.target.value });
  }

  movieClickHandler = (movieId) => {
    this.props.history.push('/movie/'+movieId);


  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.upcomingMoviesHeading}>
          <span> Upcoming Movies </span>
        </div>
        <GridList cols={6} className={classes.gridListUpcomingMovies}>
          {this.props.moviesData.map(movie => (
            <GridListTile onClick={() => this.movieClickHandler(movie.id)} key={movie.id}>

              <img src={movie.poster_url} className="movie" alt={movie.title} />
              <GridListTileBar title={movie.title} />
            </GridListTile>
          ))}
        </GridList>
        <div className="flex-container">
          <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
              {this.props.moviesData.map(movie => (
                <GridListTile onClick={() => this.movieClickHandler(movie.id)} className="marginMovie" key={"grid" + movie.id}>
                  <img src={movie.poster_url} className = "movie" alt={movie.title} />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={<span>Release Date: {new Date(movie.release_date).toDateString()}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="right">
            <Card>
              <CardContent>
                <FormControl className={classes.formControl}>
                  <Typography className={classes.title} color="textSecondary">
                    FIND MOVIES BY:
                  </Typography>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
                  <Input id="movieName" onChange={this.movieNameChangeHandler} />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox"> Genre</InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(',')}
                    value={this.state.genres}
                    onChange={this.genreSelectHandler}>
                    {genres.map(genre => (
                      <MenuItem key={genre.id} value={genre.name}>
                        <Checkbox checked={this.state.genres.indexOf(genre.name) > - 1} />
                        <ListItemText primary={genre.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-checkbox"> Artists</InputLabel>
                  <Select
                    multiple
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(',')}
                    value={this.state.artists}
                    onChange={this.artistsSelectHandler}>
                    {artists.map(artist => (
                      <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                        <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > - 1} />
                        <ListItemText primary={artist.first_name + " " + artist.last_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateStart"
                    label="Release Date Start"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="releaseDateEnd"
                    label="Release Date End"
                    type="date"
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl><br /><br />
                <FormControl className={classes.formControl}>
                  <Button variant="contained" color="primary">
                    APPLY
                    </Button>
                </FormControl>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>

    )

  }
}

export default withStyles(styles)(Home);
