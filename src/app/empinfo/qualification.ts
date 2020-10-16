export class Qualification {
  constructor(
    public qualification: string,
    public institute: string,
    public year: number,
    public score: number
  ) {}
}

export class Skill {
  constructor(
    public skillcatogary: string,
    public skill: string,
    public skilllevel: string,
    public iscurrent: string,
    public experience: string
  ) {}
}
